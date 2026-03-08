import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Shield, TrendingDown, RefreshCw, Sparkles } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string | null;
  recommendation_type: string;
  priority: string;
  confidence_score: number;
}

const LaserSmartRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchRecommendations();
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const { data } = await supabase
        .from('admin_recommendations')
        .select('*')
        .eq('status', 'approved')
        .order('confidence_score', { ascending: false })
        .limit(10);

      setRecommendations(data || []);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'preventive': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'corrective': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'optimization': return <RefreshCw className="h-4 w-4 text-purple-500" />;
      default: return <Lightbulb className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
      case 'medium': return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      default: return <Badge variant="outline" className="text-xs">Low</Badge>;
    }
  };

  if (loading) {
    return <div className="space-y-3">{[1, 2, 3].map(i => <Card key={i} className="animate-pulse"><CardContent className="py-4"><div className="h-16 bg-muted rounded" /></CardContent></Card>)}</div>;
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
          <p className="text-muted-foreground">
            Proactive learning recommendations will appear here to help prevent performance issues.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="hover:shadow-md transition-shadow">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted shrink-0">
                {getTypeIcon(rec.recommendation_type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  {getPriorityBadge(rec.priority)}
                </div>
                {rec.description && (
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Confidence: {(rec.confidence_score * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LaserSmartRecommendations;
