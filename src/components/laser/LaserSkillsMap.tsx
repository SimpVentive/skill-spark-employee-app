import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Radar, Star, TrendingUp } from 'lucide-react';

interface SkillProgress {
  kpi_name: string;
  kpi_id: string;
  category: string | null;
  total_interventions: number;
  completed_interventions: number;
  improvement_percentage: number | null;
  level: 'beginner' | 'developing' | 'proficient' | 'expert';
}

const LaserSkillsMap = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<SkillProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchSkillData();
  }, [user]);

  const fetchSkillData = async () => {
    try {
      // Get all interventions grouped by KPI
      const { data: interventions } = await supabase
        .from('laser_assigned_interventions')
        .select(`
          *,
          laser_deviations!inner(
            kpi_id,
            laser_kpi_definitions(name, category)
          )
        `)
        .eq('employee_id', user!.id);

      // Get impact validations
      const { data: validations } = await supabase
        .from('laser_impact_validations')
        .select('*')
        .in('intervention_id', (interventions || []).map(i => i.id));

      // Build skill map
      const skillMap = new Map<string, SkillProgress>();

      (interventions || []).forEach((intervention: any) => {
        const kpiId = intervention.laser_deviations?.kpi_id;
        const kpiName = intervention.laser_deviations?.laser_kpi_definitions?.name || 'Unknown';
        const category = intervention.laser_deviations?.laser_kpi_definitions?.category;

        if (!kpiId) return;

        const existing = skillMap.get(kpiId) || {
          kpi_name: kpiName,
          kpi_id: kpiId,
          category,
          total_interventions: 0,
          completed_interventions: 0,
          improvement_percentage: null,
          level: 'beginner' as const,
        };

        existing.total_interventions++;
        if (intervention.status === 'completed') {
          existing.completed_interventions++;
        }

        skillMap.set(kpiId, existing);
      });

      // Add improvement data from validations
      (validations || []).forEach((v: any) => {
        const intervention = interventions?.find(i => i.id === v.intervention_id);
        const kpiId = (intervention as any)?.laser_deviations?.kpi_id;
        if (kpiId && skillMap.has(kpiId)) {
          const skill = skillMap.get(kpiId)!;
          if (v.improvement_percentage) {
            skill.improvement_percentage = v.improvement_percentage;
          }
        }
      });

      // Determine levels
      skillMap.forEach((skill) => {
        const completionRate = skill.total_interventions > 0
          ? skill.completed_interventions / skill.total_interventions
          : 0;

        if (completionRate >= 0.9 && (skill.improvement_percentage ?? 0) > 20) {
          skill.level = 'expert';
        } else if (completionRate >= 0.7) {
          skill.level = 'proficient';
        } else if (completionRate >= 0.3) {
          skill.level = 'developing';
        } else {
          skill.level = 'beginner';
        }
      });

      setSkills(Array.from(skillMap.values()));
    } catch (err) {
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'proficient': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'developing': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelStars = (level: string) => {
    const count = level === 'expert' ? 4 : level === 'proficient' ? 3 : level === 'developing' ? 2 : 1;
    return Array.from({ length: 4 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
    ));
  };

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[1, 2, 3, 4].map(i => <Card key={i} className="animate-pulse"><CardContent className="py-6"><div className="h-16 bg-muted rounded" /></CardContent></Card>)}</div>;
  }

  if (skills.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Radar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Skills Map</h3>
          <p className="text-muted-foreground">
            Your capability development map will build as you complete learning interventions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skill) => {
        const progress = skill.total_interventions > 0
          ? (skill.completed_interventions / skill.total_interventions) * 100
          : 0;

        return (
          <Card key={skill.kpi_id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{skill.kpi_name}</h4>
                  {skill.category && (
                    <Badge variant="outline" className="text-xs mt-1">{skill.category}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">{getLevelStars(skill.level)}</div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    {skill.completed_interventions}/{skill.total_interventions} modules completed
                  </span>
                  <Badge className={`${getLevelColor(skill.level)} text-xs`}>
                    {skill.level}
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {skill.improvement_percentage !== null && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  {skill.improvement_percentage.toFixed(1)}% performance improvement
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LaserSkillsMap;
