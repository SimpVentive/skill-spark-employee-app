import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle, Clock, BookOpen, Video, ListChecks, FileImage } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Intervention {
  id: string;
  intervention_type: string;
  micro_intervention_title: string | null;
  micro_intervention_content: string | null;
  status: string;
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  deviation_id: string;
}

const LaserMicroLearning = () => {
  const { user } = useAuth();
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchInterventions();
  }, [user]);

  const fetchInterventions = async () => {
    try {
      const { data } = await supabase
        .from('laser_assigned_interventions')
        .select('*')
        .eq('employee_id', user!.id)
        .order('assigned_at', { ascending: false });

      setInterventions(data || []);
    } catch (err) {
      console.error('Error fetching interventions:', err);
    } finally {
      setLoading(false);
    }
  };

  const startIntervention = async (id: string) => {
    const { error } = await supabase
      .from('laser_assigned_interventions')
      .update({ status: 'in_progress', started_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      toast.success('Learning module started!');
      fetchInterventions();
    }
  };

  const completeIntervention = async (id: string) => {
    const { error } = await supabase
      .from('laser_assigned_interventions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      toast.success('Learning module completed! Great work! 🎉');
      // Auto-create diary entry
      await supabase.from('laser_learning_diary').insert({
        employee_id: user!.id,
        entry_type: 'learning_completed',
        title: `Completed micro-learning module`,
        description: `Completed assigned intervention`,
        related_intervention_id: id,
      });
      fetchInterventions();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'micro_learning': return <Video className="h-4 w-4" />;
      case 'program': return <BookOpen className="h-4 w-4" />;
      case 'checklist': return <ListChecks className="h-4 w-4" />;
      default: return <FileImage className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-500/10 text-green-600 border-green-200">Completed</Badge>;
      case 'in_progress': return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">In Progress</Badge>;
      default: return <Badge variant="secondary">Assigned</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="py-4"><div className="h-20 bg-muted rounded" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const active = interventions.filter(i => i.status !== 'completed');
  const completed = interventions.filter(i => i.status === 'completed');

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Modules</h3>
          {active.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {getTypeIcon(item.intervention_type)}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-sm">
                          {item.micro_intervention_title || 'Learning Module'}
                        </h4>
                        {getStatusBadge(item.status)}
                      </div>
                      {item.micro_intervention_content && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.micro_intervention_content}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Assigned {format(new Date(item.assigned_at), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {item.status === 'assigned' ? (
                      <Button size="sm" onClick={() => startIntervention(item.id)}>
                        <Play className="h-4 w-4 mr-1" /> Start
                      </Button>
                    ) : (
                      <Button size="sm" variant="default" onClick={() => completeIntervention(item.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {completed.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Completed ({completed.length})
          </h3>
          {completed.map((item) => (
            <Card key={item.id} className="opacity-75">
              <CardContent className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <h4 className="text-sm font-medium">{item.micro_intervention_title || 'Learning Module'}</h4>
                      {item.completed_at && (
                        <p className="text-xs text-muted-foreground">
                          Completed {format(new Date(item.completed_at), 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {interventions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Learning Modules</h3>
            <p className="text-muted-foreground">
              Targeted micro-learning modules will appear here when assigned based on your KPI performance.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LaserMicroLearning;
