
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Mail, MessageSquare, Send, Zap, Clock, Target } from 'lucide-react';

interface MessageTemplate {
  id: string;
  title: string;
  message: string;
  type: 'progress' | 'motivation' | 'reminder' | 'achievement';
  trigger: string;
}

const MotivationalMessaging = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [testMessage, setTestMessage] = useState({
    message: "Great job! You're 80% through your current course. Keep it up! 🚀",
    type: 'email'
  });
  const { user } = useAuth();

  const defaultTemplates: MessageTemplate[] = [
    {
      id: '1',
      title: 'Course Progress Milestone',
      message: "Amazing! You've completed {progress}% of your course '{course_name}'. You're doing great! 🌟",
      type: 'progress',
      trigger: 'progress_milestone'
    },
    {
      id: '2',
      title: 'Weekly Motivation',
      message: "Hey {name}! Ready to continue your learning journey? Your next lesson is waiting for you! 💪",
      type: 'motivation',
      trigger: 'weekly_reminder'
    },
    {
      id: '3',
      title: 'Achievement Unlocked',
      message: "Congratulations! You've earned the '{badge_name}' badge! Your dedication is paying off! 🏆",
      type: 'achievement',
      trigger: 'badge_earned'
    },
    {
      id: '4',
      title: 'Comeback Encouragement',
      message: "We miss you! Come back and continue your learning streak. Your progress is waiting! 🎯",
      type: 'reminder',
      trigger: 'inactive_reminder'
    }
  ];

  const sendTestMessage = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-motivation', {
        body: {
          userId: user.id,
          message: testMessage.message,
          type: testMessage.type
        }
      });

      if (error) throw error;

      toast.success(`Test ${testMessage.type} sent successfully!`);
      console.log('Message sent:', data);
    } catch (error) {
      console.error('Error sending test message:', error);
      toast.error('Failed to send test message');
    } finally {
      setLoading(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'progress': return <Target className="h-5 w-5 text-blue-600" />;
      case 'motivation': return <Zap className="h-5 w-5 text-yellow-600" />;
      case 'reminder': return <Clock className="h-5 w-5 text-orange-600" />;
      case 'achievement': return <Target className="h-5 w-5 text-green-600" />;
      default: return <MessageSquare className="h-5 w-5 text-gray-600" />;
    }
  };

  useEffect(() => {
    setTemplates(defaultTemplates);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold">Motivational Messaging</h2>
        </div>
        <p className="text-muted-foreground">
          Send encouraging messages via email and SMS to keep learners engaged
        </p>
      </div>

      {/* Test Message Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Test Message
          </CardTitle>
          <CardDescription>
            Send a test message to see how the system works
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Message Type</Label>
            <Select
              value={testMessage.type}
              onValueChange={(value) => setTestMessage(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Test Message</Label>
            <Textarea
              placeholder="Enter your test message..."
              value={testMessage.message}
              onChange={(e) => setTestMessage(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
            />
          </div>

          <Button 
            onClick={sendTestMessage} 
            disabled={loading || !testMessage.message.trim()}
            className="w-full"
          >
            {loading ? 'Sending...' : `Send Test ${testMessage.type.toUpperCase()}`}
          </Button>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Message Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getIconForType(template.type)}
                  {template.title}
                </CardTitle>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                    {template.type}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {template.trigger}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.message}
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setTestMessage(prev => ({ ...prev, message: template.message }))}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>
            Configure your messaging providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">SendGrid Email</p>
                <p className="text-sm text-muted-foreground">Email messaging service</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600 font-medium">Connected</span>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Twilio SMS</p>
                <p className="text-sm text-muted-foreground">SMS messaging service</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Not Configured</span>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivationalMessaging;
