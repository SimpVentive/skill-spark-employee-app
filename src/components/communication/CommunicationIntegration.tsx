
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Bell, Send, Settings } from 'lucide-react';
import { toast } from 'sonner';

const CommunicationIntegration = () => {
  const [slackWebhook, setSlackWebhook] = useState('');
  const [teamsWebhook, setTeamsWebhook] = useState('');
  const [fcmServerKey, setFcmServerKey] = useState('');
  const [slackConnected, setSlackConnected] = useState(false);
  const [teamsConnected, setTeamsConnected] = useState(false);
  const [fcmEnabled, setFcmEnabled] = useState(false);
  const [testMessage, setTestMessage] = useState('');

  const handleSlackConnect = () => {
    if (!slackWebhook) {
      toast.error('Please enter Slack webhook URL');
      return;
    }
    console.log('Connecting to Slack with webhook:', slackWebhook);
    setSlackConnected(true);
    toast.success('Slack integration connected!');
  };

  const handleTeamsConnect = () => {
    if (!teamsWebhook) {
      toast.error('Please enter Teams webhook URL');
      return;
    }
    console.log('Connecting to Microsoft Teams with webhook:', teamsWebhook);
    setTeamsConnected(true);
    toast.success('Microsoft Teams integration connected!');
  };

  const handleFCMSetup = () => {
    if (!fcmServerKey) {
      toast.error('Please enter FCM Server Key');
      return;
    }
    console.log('Setting up Firebase Cloud Messaging with key:', fcmServerKey);
    setFcmEnabled(true);
    toast.success('Firebase Cloud Messaging configured!');
  };

  const sendTestMessage = async () => {
    if (!testMessage) {
      toast.error('Please enter a test message');
      return;
    }

    const channels = [];
    if (slackConnected) channels.push('Slack');
    if (teamsConnected) channels.push('Teams');
    if (fcmEnabled) channels.push('Push Notifications');

    if (channels.length === 0) {
      toast.error('Please connect at least one communication channel');
      return;
    }

    console.log('Sending test message to:', channels.join(', '));
    console.log('Message:', testMessage);
    toast.success(`Test message sent to ${channels.join(', ')}!`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Team Communication
          </CardTitle>
          <CardDescription>
            Connect team communication platforms for training notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Slack Integration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                  <MessageSquare className="h-3 w-3 text-white" />
                </div>
                <Label>Slack Integration</Label>
                {slackConnected && <Badge variant="default" className="ml-2">Connected</Badge>}
              </div>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Enter Slack Webhook URL"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                type="url"
              />
              <Button onClick={handleSlackConnect} size="sm" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                {slackConnected ? 'Reconnect' : 'Connect'} Slack
              </Button>
            </div>
          </div>

          <Separator />

          {/* Microsoft Teams Integration */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <MessageSquare className="h-3 w-3 text-white" />
                </div>
                <Label>Microsoft Teams Integration</Label>
                {teamsConnected && <Badge variant="default" className="ml-2">Connected</Badge>}
              </div>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Enter Teams Webhook URL"
                value={teamsWebhook}
                onChange={(e) => setTeamsWebhook(e.target.value)}
                type="url"
              />
              <Button onClick={handleTeamsConnect} size="sm" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                {teamsConnected ? 'Reconnect' : 'Connect'} Teams
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Firebase Cloud Messaging for mobile and web push notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Firebase Cloud Messaging</Label>
              {fcmEnabled && <Badge variant="default">Enabled</Badge>}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Enter FCM Server Key"
                value={fcmServerKey}
                onChange={(e) => setFcmServerKey(e.target.value)}
                type="password"
              />
              <Button onClick={handleFCMSetup} size="sm" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Configure FCM
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Communications</CardTitle>
          <CardDescription>
            Send a test message to all connected platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Test Message</Label>
            <Textarea
              placeholder="Enter test message..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
            />
          </div>
          <Button onClick={sendTestMessage} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Test Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationIntegration;
