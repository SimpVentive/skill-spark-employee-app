
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface NotificationPreferences {
  id?: string;
  email_enabled: boolean;
  sms_enabled: boolean;
  phone_number?: string;
  motivation_emails: boolean;
  progress_updates: boolean;
  achievement_notifications: boolean;
}

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_enabled: true,
    sms_enabled: false,
    motivation_emails: true,
    progress_updates: true,
    achievement_notifications: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPreferences({
          id: data.id,
          email_enabled: data.email_enabled ?? true,
          sms_enabled: data.sms_enabled ?? false,
          phone_number: data.phone_number || '',
          motivation_emails: data.motivation_emails ?? true,
          progress_updates: data.progress_updates ?? true,
          achievement_notifications: data.achievement_notifications ?? true,
        });
      }
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      toast.error('Failed to load notification settings');
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
        });

      if (error) throw error;

      toast.success('Notification preferences saved!');
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const updatePreference = (key: keyof NotificationPreferences, value: boolean | string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading notification settings...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Notification Settings</h2>
        <p className="text-muted-foreground mt-2">
          Customize how you receive updates and motivational messages
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Channels</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={preferences.email_enabled}
              onCheckedChange={(checked) => updatePreference('email_enabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via text message
              </p>
            </div>
            <Switch
              checked={preferences.sms_enabled}
              onCheckedChange={(checked) => updatePreference('sms_enabled', checked)}
            />
          </div>

          {preferences.sms_enabled && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={preferences.phone_number || ''}
                onChange={(e) => updatePreference('phone_number', e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Select which types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Motivational Messages</Label>
              <p className="text-sm text-muted-foreground">
                Get encouraging messages to keep you motivated
              </p>
            </div>
            <Switch
              checked={preferences.motivation_emails}
              onCheckedChange={(checked) => updatePreference('motivation_emails', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Progress Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your learning progress
              </p>
            </div>
            <Switch
              checked={preferences.progress_updates}
              onCheckedChange={(checked) => updatePreference('progress_updates', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Achievement Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when you earn badges or complete milestones
              </p>
            </div>
            <Switch
              checked={preferences.achievement_notifications}
              onCheckedChange={(checked) => updatePreference('achievement_notifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={savePreferences} 
          disabled={saving}
          size="lg"
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
