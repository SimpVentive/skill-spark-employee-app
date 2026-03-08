import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardList, CheckCircle, Clock, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ChecklistItem {
  text: string;
  done: boolean;
}

interface ActionTask {
  id: string;
  title: string;
  description: string | null;
  checklist: ChecklistItem[];
  status: string;
  due_date: string | null;
  completed_at: string | null;
  supervisor_notes: string | null;
  created_at: string;
}

const LaserActionTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ActionTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data } = await supabase
        .from('laser_action_tasks')
        .select('*')
        .eq('employee_id', user!.id)
        .order('created_at', { ascending: false });

      setTasks(
        (data || []).map((t: any) => ({
          ...t,
          checklist: Array.isArray(t.checklist) ? t.checklist : [],
        }))
      );
    } catch (err) {
      console.error('Error fetching action tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklistItem = async (taskId: string, index: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updated = [...task.checklist];
    updated[index] = { ...updated[index], done: !updated[index].done };

    const allDone = updated.every(item => item.done);

    await supabase
      .from('laser_action_tasks')
      .update({
        checklist: updated as any,
        status: allDone ? 'completed' : 'in_progress',
        completed_at: allDone ? new Date().toISOString() : null,
      })
      .eq('id', taskId);

    if (allDone) {
      toast.success('Action task completed! Well done! 🎯');
      // Auto diary entry
      await supabase.from('laser_learning_diary').insert({
        employee_id: user!.id,
        entry_type: 'action_completed',
        title: `Completed action task: ${task.title}`,
        description: task.description,
      });
    }

    fetchTasks();
  };

  const markComplete = async (taskId: string) => {
    await supabase
      .from('laser_action_tasks')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', taskId);

    toast.success('Task marked as complete!');
    fetchTasks();
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="py-4"><div className="h-24 bg-muted rounded" /></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const pending = tasks.filter(t => t.status !== 'completed');
  const done = tasks.filter(t => t.status === 'completed');

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Action Tasks</h3>
          <p className="text-muted-foreground">
            Workplace action tasks will appear after completing learning modules.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pending Tasks</h3>
          {pending.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    )}
                  </div>
                  <Badge variant="secondary">{task.status}</Badge>
                </div>

                {task.checklist.length > 0 && (
                  <div className="space-y-2 pl-1">
                    {task.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Checkbox
                          checked={item.done}
                          onCheckedChange={() => toggleChecklistItem(task.id, idx)}
                        />
                        <span className={`text-sm ${item.done ? 'line-through text-muted-foreground' : ''}`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {task.supervisor_notes && (
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <span className="font-medium">Supervisor note:</span> {task.supervisor_notes}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {task.due_date && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(task.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  {task.checklist.length === 0 && (
                    <Button size="sm" onClick={() => markComplete(task.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Mark Done
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {done.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Completed ({done.length})
          </h3>
          {done.map((task) => (
            <Card key={task.id} className="opacity-75">
              <CardContent className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{task.title}</span>
                </div>
                {task.completed_at && (
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(task.completed_at), 'MMM d, yyyy')}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaserActionTasks;
