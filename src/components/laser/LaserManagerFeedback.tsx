import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, UserCircle } from 'lucide-react';
import { format } from 'date-fns';

interface FeedbackMessage {
  id: string;
  message: string;
  feedback_type: string;
  is_read: boolean;
  created_at: string;
  manager_id: string;
}

const LaserManagerFeedback = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchFeedback();
  }, [user]);

  const fetchFeedback = async () => {
    try {
      const { data } = await supabase
        .from('laser_manager_feedback')
        .select('*')
        .eq('employee_id', user!.id)
        .order('created_at', { ascending: false });

      setMessages(data || []);

      // Mark unread as read
      const unread = (data || []).filter((m: any) => !m.is_read).map((m: any) => m.id);
      if (unread.length > 0) {
        await supabase
          .from('laser_manager_feedback')
          .update({ is_read: true })
          .in('id', unread);
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'coaching': return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 text-xs">Coaching</Badge>;
      case 'recognition': return <Badge className="bg-green-500/10 text-green-600 border-green-200 text-xs">Recognition</Badge>;
      case 'action_assigned': return <Badge className="bg-orange-500/10 text-orange-600 border-orange-200 text-xs">Action</Badge>;
      default: return <Badge variant="outline" className="text-xs">{type}</Badge>;
    }
  };

  if (loading) {
    return <div className="space-y-3">{[1, 2].map(i => <Card key={i} className="animate-pulse"><CardContent className="py-4"><div className="h-12 bg-muted rounded" /></CardContent></Card>)}</div>;
  }

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Manager Feedback</h3>
          <p className="text-muted-foreground">
            Coaching messages and feedback from your manager will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <Card key={msg.id} className={!msg.is_read ? 'border-primary/30 bg-primary/5' : ''}>
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <UserCircle className="h-8 w-8 text-muted-foreground shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Manager</span>
                  {getTypeBadge(msg.feedback_type)}
                  {!msg.is_read && <Badge variant="default" className="text-xs">New</Badge>}
                </div>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(msg.created_at), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LaserManagerFeedback;
