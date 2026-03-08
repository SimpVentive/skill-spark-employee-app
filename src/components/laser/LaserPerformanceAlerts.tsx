import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, AlertCircle, ArrowRight, Clock, Zap } from 'lucide-react';
import { format } from 'date-fns';

interface Alert {
  id: string;
  kpi_name: string;
  actual_value: number;
  target_value: number;
  deviation_percentage: number;
  severity: string;
  detected_at: string;
  status: string;
  cause_name?: string;
  cause_category?: string;
  intervention_title?: string;
  intervention_id?: string;
}

interface LaserPerformanceAlertsProps {
  onNavigateToLearning?: (interventionId: string) => void;
}

const LaserPerformanceAlerts = ({ onNavigateToLearning }: LaserPerformanceAlertsProps) => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchAlerts();
  }, [user]);

  const fetchAlerts = async () => {
    try {
      const { data: deviations } = await supabase
        .from('laser_deviations')
        .select(`
          *,
          laser_kpi_definitions(name, unit),
          laser_rca_results(
            id,
            probability_score,
            is_primary_cause,
            laser_cause_definitions(cause_name, cause_category)
          )
        `)
        .eq('employee_id', user!.id)
        .in('status', ['active', 'investigating'])
        .order('detected_at', { ascending: false });

      // Get assigned interventions for these deviations
      const deviationIds = deviations?.map(d => d.id) || [];
      let interventions: any[] = [];
      if (deviationIds.length > 0) {
        const { data } = await supabase
          .from('laser_assigned_interventions')
          .select('*')
          .eq('employee_id', user!.id)
          .in('deviation_id', deviationIds)
          .in('status', ['assigned', 'in_progress']);
        interventions = data || [];
      }

      const alertList: Alert[] = (deviations || []).map((dev: any) => {
        const primaryRca = dev.laser_rca_results?.find((r: any) => r.is_primary_cause);
        const intervention = interventions.find((i: any) => i.deviation_id === dev.id);

        return {
          id: dev.id,
          kpi_name: dev.laser_kpi_definitions?.name || 'Unknown KPI',
          actual_value: dev.actual_value,
          target_value: dev.target_value,
          deviation_percentage: dev.deviation_percentage,
          severity: dev.severity,
          detected_at: dev.detected_at,
          status: dev.status,
          cause_name: primaryRca?.laser_cause_definitions?.cause_name,
          cause_category: primaryRca?.laser_cause_definitions?.cause_category,
          intervention_title: intervention?.micro_intervention_title || 'Assigned learning module',
          intervention_id: intervention?.id,
        };
      });

      setAlerts(alertList);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="py-4"><div className="h-16 bg-muted rounded" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Zap className="h-12 w-12 mx-auto text-green-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
          <p className="text-muted-foreground">No active performance alerts. Keep up the great work!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={
            alert.severity === 'critical'
              ? 'border-destructive/50 bg-destructive/5'
              : 'border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/10'
          }
        >
          <CardContent className="py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                {alert.severity === 'critical' ? (
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                )}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm">{alert.kpi_name}</h4>
                    <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current: <strong>{alert.actual_value}</strong> vs Target: <strong>{alert.target_value}</strong>
                    {' '}({alert.deviation_percentage > 0 ? '+' : ''}{alert.deviation_percentage.toFixed(1)}% deviation)
                  </p>
                  {alert.cause_name && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Possible cause:</span>{' '}
                      <span className="font-medium">{alert.cause_name}</span>
                      {alert.cause_category && (
                        <Badge variant="outline" className="ml-2 text-xs">{alert.cause_category}</Badge>
                      )}
                    </p>
                  )}
                  {alert.intervention_title && (
                    <p className="text-sm text-primary font-medium">
                      Recommended: {alert.intervention_title}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(new Date(alert.detected_at), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
              {alert.intervention_id && onNavigateToLearning && (
                <Button
                  size="sm"
                  onClick={() => onNavigateToLearning(alert.intervention_id!)}
                  className="shrink-0"
                >
                  Start Learning <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LaserPerformanceAlerts;
