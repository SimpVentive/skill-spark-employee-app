
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Star, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  badge_type: string;
  criteria: string;
  points_value: number;
  image_url?: string;
  earned_at?: string;
}

const BadgeSystem = () => {
  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBadges = async () => {
    try {
      const { data: allBadges, error: badgesError } = await supabase
        .from('badges')
        .select('*')
        .eq('is_active', true);

      if (badgesError) throw badgesError;

      if (user) {
        const { data: earnedBadges, error: userBadgesError } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', user.id);

        if (userBadgesError) throw userBadgesError;

        setUserBadges(earnedBadges?.map(b => b.badge_id) || []);
      }

      setBadges(allBadges || []);
    } catch (error) {
      console.error('Error fetching badges:', error);
      toast.error('Failed to load badges');
    } finally {
      setLoading(false);
    }
  };

  const awardBadge = async (badgeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_badges')
        .insert({
          user_id: user.id,
          badge_id: badgeId,
        });

      if (error) throw error;

      toast.success('Badge earned! 🎉');
      fetchBadges();
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="h-6 w-6" />;
      case 'skill': return <Star className="h-6 w-6" />;
      case 'completion': return <Target className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  useEffect(() => {
    fetchBadges();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading badges...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Achievement Badges</h2>
        <p className="text-muted-foreground mt-2">
          Earn badges by completing courses and achieving milestones
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => {
          const isEarned = userBadges.includes(badge.id);
          
          return (
            <Card key={badge.id} className={`transition-all ${isEarned ? 'ring-2 ring-yellow-500' : 'opacity-75'}`}>
              <CardHeader className="text-center">
                <div className={`mx-auto mb-2 ${isEarned ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                  {getBadgeIcon(badge.badge_type)}
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {badge.name}
                  {isEarned && <Badge variant="secondary">Earned</Badge>}
                </CardTitle>
                <CardDescription>{badge.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">{badge.criteria}</p>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{badge.points_value} points</span>
                </div>
                {!isEarned && user && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => awardBadge(badge.id)}
                  >
                    Test Award
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeSystem;
