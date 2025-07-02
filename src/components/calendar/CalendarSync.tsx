
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Calendar, Video, Link as LinkIcon, Settings, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const CalendarSync = () => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [microsoftConnected, setMicrosoftConnected] = useState(false);
  const [zoomApiKey, setZoomApiKey] = useState('');
  const [meetEnabled, setMeetEnabled] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const handleGoogleConnect = async () => {
    try {
      // Simulate Google Calendar API connection
      console.log('Connecting to Google Calendar API...');
      setGoogleConnected(true);
      toast.success('Google Calendar connected successfully!');
    } catch (error) {
      toast.error('Failed to connect Google Calendar');
    }
  };

  const handleMicrosoftConnect = async () => {
    try {
      // Simulate Microsoft Graph API connection
      console.log('Connecting to Microsoft Graph API...');
      setMicrosoftConnected(true);
      toast.success('Microsoft Calendar connected successfully!');
    } catch (error) {
      toast.error('Failed to connect Microsoft Calendar');
    }
  };

  const handleZoomSetup = () => {
    if (!zoomApiKey) {
      toast.error('Please enter Zoom API key');
      return;
    }
    console.log('Setting up Zoom integration with API key:', zoomApiKey);
    toast.success('Zoom integration configured!');
  };

  const syncDeadlines = async () => {
    try {
      console.log('Syncing training deadlines to calendars...');
      toast.success('Deadlines synced to calendars!');
    } catch (error) {
      toast.error('Failed to sync deadlines');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Integration
          </CardTitle>
          <CardDescription>
            Connect external calendars to sync training deadlines and sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Calendar */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium">Google Calendar</h4>
                <p className="text-sm text-muted-foreground">Sync with Google Calendar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {googleConnected && <Badge variant="default">Connected</Badge>}
              <Button 
                variant={googleConnected ? "outline" : "default"}
                size="sm"
                onClick={handleGoogleConnect}
              >
                {googleConnected ? 'Reconnect' : 'Connect'}
              </Button>
            </div>
          </div>

          {/* Microsoft Calendar */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium">Microsoft Calendar</h4>
                <p className="text-sm text-muted-foreground">Sync with Outlook/Office 365</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {microsoftConnected && <Badge variant="default">Connected</Badge>}
              <Button 
                variant={microsoftConnected ? "outline" : "default"}
                size="sm"
                onClick={handleMicrosoftConnect}
              >
                {microsoftConnected ? 'Reconnect' : 'Connect'}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Sync Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Sync Settings</h4>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-sync">Auto-sync deadlines</Label>
                <p className="text-sm text-muted-foreground">Automatically sync training deadlines to calendar</p>
              </div>
              <Switch
                id="auto-sync"
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
            </div>
            <Button onClick={syncDeadlines} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Conferencing
          </CardTitle>
          <CardDescription>
            Auto-generate meeting links for live training sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Zoom Integration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <Label>Zoom Integration</Label>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Enter Zoom API Key"
                value={zoomApiKey}
                onChange={(e) => setZoomApiKey(e.target.value)}
                type="password"
              />
              <Button onClick={handleZoomSetup} size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure Zoom
              </Button>
            </div>
          </div>

          <Separator />

          {/* Google Meet */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <LinkIcon className="h-4 w-4" />
                <Label>Google Meet Auto-generation</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically create Google Meet links for sessions
              </p>
            </div>
            <Switch
              checked={meetEnabled}
              onCheckedChange={setMeetEnabled}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSync;
