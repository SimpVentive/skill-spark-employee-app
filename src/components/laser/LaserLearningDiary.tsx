import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Plus, GraduationCap, ClipboardCheck, TrendingUp, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DiaryEntry {
  id: string;
  entry_type: string;
  title: string;
  description: string | null;
  performance_improvement_note: string | null;
  created_at: string;
}

const LaserLearningDiary = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (!user) return;
    fetchEntries();
  }, [user]);

  const fetchEntries = async () => {
    try {
      const { data } = await supabase
        .from('laser_learning_diary')
        .select('*')
        .eq('employee_id', user!.id)
        .order('created_at', { ascending: false });

      setEntries(data || []);
    } catch (err) {
      console.error('Error fetching diary entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async () => {
    if (!newTitle.trim()) return;

    const { error } = await supabase.from('laser_learning_diary').insert({
      employee_id: user!.id,
      entry_type: 'personal_note',
      title: newTitle.trim(),
      description: newDescription.trim() || null,
      performance_improvement_note: newNote.trim() || null,
    });

    if (!error) {
      toast.success('Diary entry added!');
      setNewTitle('');
      setNewDescription('');
      setNewNote('');
      setDialogOpen(false);
      fetchEntries();
    }
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'learning_completed': return <GraduationCap className="h-4 w-4 text-blue-500" />;
      case 'action_completed': return <ClipboardCheck className="h-4 w-4 text-green-500" />;
      case 'performance_improvement': return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'personal_note': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      default: return <BookOpen className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getEntryBadge = (type: string) => {
    switch (type) {
      case 'learning_completed': return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 text-xs">Learning</Badge>;
      case 'action_completed': return <Badge className="bg-green-500/10 text-green-600 border-green-200 text-xs">Action</Badge>;
      case 'performance_improvement': return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs">Improvement</Badge>;
      default: return <Badge variant="outline" className="text-xs">Note</Badge>;
    }
  };

  if (loading) {
    return <div className="space-y-3">{[1, 2, 3].map(i => <Card key={i} className="animate-pulse"><CardContent className="py-4"><div className="h-12 bg-muted rounded" /></CardContent></Card>)}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Your personal improvement journal</p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Entry</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Diary Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              <Textarea placeholder="Description or reflection..." value={newDescription} onChange={e => setNewDescription(e.target.value)} />
              <Textarea placeholder="Performance improvement notes (optional)" value={newNote} onChange={e => setNewNote(e.target.value)} />
              <Button onClick={addEntry} disabled={!newTitle.trim()} className="w-full">Save Entry</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {entries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Learning Diary</h3>
            <p className="text-muted-foreground">
              Track your learning journey, reflections, and performance improvements.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="flex gap-4 relative">
                <div className="z-10 p-1.5 rounded-full bg-background border shrink-0">
                  {getEntryIcon(entry.entry_type)}
                </div>
                <Card className="flex-1">
                  <CardContent className="py-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold">{entry.title}</h4>
                      {getEntryBadge(entry.entry_type)}
                    </div>
                    {entry.description && <p className="text-sm text-muted-foreground">{entry.description}</p>}
                    {entry.performance_improvement_note && (
                      <div className="mt-2 bg-green-50 dark:bg-green-900/10 rounded p-2 text-xs text-green-700 dark:text-green-400">
                        📈 {entry.performance_improvement_note}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(new Date(entry.created_at), 'MMM d, yyyy h:mm a')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LaserLearningDiary;
