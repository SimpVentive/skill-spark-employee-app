import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Target } from 'lucide-react';

interface KPIData {
  kpi_id: string;
  kpi_name: string;
  unit: string;
  latest_value: number;
  target_value: number;
  deviation_percentage: number | null;
  severity: string | null;
  trend: 'up' | 'down' | 'stable';
}

const LaserKPIDashboard = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState<KPIData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchKPIData();
  }, [user]);

  const fetchKPIData = async () => {
    try {
      // Get employee's latest performance signals
      const { data: signals } = await supabase
        .from('laser_performance_signals')
        .select('*, laser_kpi_definitions(*)')
        .eq('employee_id', user!.id)
        .order('measurement_date', { ascending: false })
        .limit(20);

      // Get active deviations
      const { data: deviations } = await supabase
        .from('laser_deviations')
        .select('*, laser_kpi_definitions(*), laser_role_kpi_mappings(*)')
        .eq('employee_id', user!.id)
        .eq('status', 'active');

      // Aggregate KPI data
      const kpiMap = new Map<string, KPIData>();

      signals?.forEach((signal: any) => {
        const kpiId = signal.kpi_id;
        if (!kpiMap.has(kpiId)) {
          kpiMap.set(kpiId, {
            kpi_id: kpiId,
            kpi_name: signal.laser_kpi_definitions?.name || 'Unknown KPI',
            unit: signal.laser_kpi_definitions?.unit || '',
            latest_value: signal.kpi_value,
            target_value: 100,
            deviation_percentage: null,
            severity: null,
            trend: 'stable',
          });
        }
      });

      deviations?.forEach((dev: any) => {
        const kpiId = dev.kpi_id;
        const existing = kpiMap.get(kpiId);
        if (existing) {
          existing.deviation_percentage = dev.deviation_percentage;
          existing.severity = dev.severity;
          existing.target_value = dev.target_value;
          existing.latest_value = dev.actual_value;
        } else {
          kpiMap.set(kpiId, {
            kpi_id: kpiId,
            kpi_name: dev.laser_kpi_definitions?.name || 'Unknown KPI',
            unit: dev.laser_kpi_definitions?.unit || '',
            latest_value: dev.actual_value,
            target_value: dev.target_value,
            deviation_percentage: dev.deviation_percentage,
            severity: dev.severity,
            trend: 'down',
          });
        }
      });

      setKpis(Array.from(kpiMap.values()));
    } catch (err) {
      console.error('Error fetching KPI data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'default';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getProgressValue = (actual: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(100, Math.max(0, (actual / target) * 100));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2"><div className="h-4 bg-muted rounded w-3/4" /></CardHeader>
            <CardContent><div className="h-8 bg-muted rounded w-1/2" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (kpis.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No KPI Data Yet</h3>
          <p className="text-muted-foreground">
            Your performance signals will appear here once your KPIs are being tracked.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.kpi_id} className={kpi.severity === 'critical' ? 'border-destructive/50 bg-destructive/5' : ''}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">{kpi.kpi_name}</CardTitle>
              <div className="flex items-center gap-2">
                {getTrendIcon(kpi.trend)}
                {kpi.severity && (
                  <Badge variant={getSeverityColor(kpi.severity) as any}>
                    {kpi.severity === 'critical' ? (
                      <><AlertTriangle className="h-3 w-3 mr-1" /> Critical</>
                    ) : kpi.severity === 'warning' ? (
                      'Warning'
                    ) : (
                      <><CheckCircle className="h-3 w-3 mr-1" /> On Track</>
                    )}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold">{kpi.latest_value}</span>
                <span className="text-sm text-muted-foreground">/ {kpi.target_value} {kpi.unit}</span>
              </div>
              <Progress value={getProgressValue(kpi.latest_value, kpi.target_value)} className="h-2" />
              {kpi.deviation_percentage !== null && (
                <p className="text-xs text-muted-foreground mt-2">
                  {kpi.deviation_percentage > 0 ? '+' : ''}{kpi.deviation_percentage.toFixed(1)}% from target
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LaserKPIDashboard;
