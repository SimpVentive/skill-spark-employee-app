
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Users, Settings, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ForumTopic {
  id: number;
  title: string;
  posts_count: number;
  created_at: string;
  course_id?: string;
}

const CollaborativeLearning = () => {
  const [discourseUrl, setDiscourseUrl] = useState('');
  const [discourseApiKey, setDiscourseApiKey] = useState('');
  const [discourseUsername, setDiscourseUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [autoCreateForums, setAutoCreateForums] = useState(true);
  const [topics, setTopics] = useState<ForumTopic[]>([]);

  const handleConnect = async () => {
    if (!discourseUrl || !discourseApiKey || !discourseUsername) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      console.log('Connecting to Discourse:', {
        url: discourseUrl,
        username: discourseUsername,
        apiKey: discourseApiKey.substring(0, 8) + '...'
      });

      // Simulate API connection
      setConnected(true);
      toast.success('Discourse forum connected successfully!');
      
      // Load sample topics
      setTopics([
        {
          id: 1,
          title: 'JavaScript Fundamentals - Q&A',
          posts_count: 15,
          created_at: '2024-01-15',
          course_id: 'js-101'
        },
        {
          id: 2,
          title: 'React Best Practices Discussion',
          posts_count: 8,
          created_at: '2024-01-20',
          course_id: 'react-101'
        },
        {
          id: 3,
          title: 'General Learning Support',
          posts_count: 23,
          created_at: '2024-01-10'
        }
      ]);
    } catch (error) {
      toast.error('Failed to connect to Discourse forum');
    }
  };

  const createCourseCategory = async (courseName: string) => {
    if (!connected) {
      toast.error('Please connect to Discourse first');
      return;
    }

    try {
      console.log('Creating forum category for course:', courseName);
      toast.success(`Forum category created for ${courseName}!`);
    } catch (error) {
      toast.error('Failed to create forum category');
    }
  };

  const embedForum = (topicId: number) => {
    if (!connected) {
      toast.error('Please connect to Discourse first');
      return;
    }

    const embedUrl = `${discourseUrl}/t/${topicId}`;
    console.log('Embedding forum topic:', embedUrl);
    toast.success('Forum topic embedded in course!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Discussion Forums
          </CardTitle>
          <CardDescription>
            Connect Discourse forums for course discussions and peer learning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Discourse Configuration</h4>
              {connected && <Badge variant="default">Connected</Badge>}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discourse-url">Discourse URL</Label>
                <Input
                  id="discourse-url"
                  placeholder="https://your-forum.discourse.group"
                  value={discourseUrl}
                  onChange={(e) => setDiscourseUrl(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discourse-api-key">API Key</Label>
                <Input
                  id="discourse-api-key"
                  type="password"
                  placeholder="Enter Discourse API Key"
                  value={discourseApiKey}
                  onChange={(e) => setDiscourseApiKey(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discourse-username">API Username</Label>
                <Input
                  id="discourse-username"
                  placeholder="API user username"
                  value={discourseUsername}
                  onChange={(e) => setDiscourseUsername(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleConnect} className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              {connected ? 'Reconnect' : 'Connect'} to Discourse
            </Button>
          </div>

          <Separator />

          {/* Forum Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Forum Settings</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-create course forums</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically create forum categories for new courses
                </p>
              </div>
              <Switch
                checked={autoCreateForums}
                onCheckedChange={setAutoCreateForums}
              />
            </div>

            <Button 
              onClick={() => createCourseCategory('Sample Course')}
              variant="outline"
              className="w-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Create Sample Forum
            </Button>
          </div>
        </CardContent>
      </Card>

      {connected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Forum Topics
            </CardTitle>
            <CardDescription>
              Recent discussions across all course forums
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium">{topic.title}</h5>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{topic.posts_count} posts</span>
                      <span>Created {topic.created_at}</span>
                      {topic.course_id && (
                        <Badge variant="outline" className="text-xs">
                          Course: {topic.course_id}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => embedForum(topic.id)}
                    >
                      Embed
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`${discourseUrl}/t/${topic.id}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CollaborativeLearning;
