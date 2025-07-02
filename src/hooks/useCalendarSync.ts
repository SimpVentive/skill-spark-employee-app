
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CalendarSync {
  id: string;
  provider: 'google' | 'outlook';
  is_active: boolean;
  calendar_id?: string;
  created_at: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  external_event_id: string;
}

export const useCalendarSync = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [syncSettings, setSyncSettings] = useState<CalendarSync[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSyncSettings();
      fetchCalendarEvents();
    }
  }, [user]);

  const fetchSyncSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_sync')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setSyncSettings(data || []);
    } catch (error) {
      console.error('Error fetching sync settings:', error);
    }
  };

  const fetchCalendarEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user?.id)
        .order('start_time', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  };

  const connectProvider = async (provider: 'google' | 'outlook') => {
    setLoading(true);
    try {
      // For now, we'll create a placeholder sync setting
      // In production, this would handle OAuth flow
      const { error } = await supabase
        .from('calendar_sync')
        .upsert({
          user_id: user?.id,
          provider,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Calendar Connected",
        description: `${provider === 'google' ? 'Google' : 'Outlook'} calendar has been connected successfully.`,
      });

      await fetchSyncSettings();
    } catch (error) {
      console.error('Error connecting calendar:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disconnectProvider = async (syncId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_sync')
        .delete()
        .eq('id', syncId);

      if (error) throw error;

      toast({
        title: "Calendar Disconnected",
        description: "Calendar has been disconnected successfully.",
      });

      await fetchSyncSettings();
      await fetchCalendarEvents();
    } catch (error) {
      console.error('Error disconnecting calendar:', error);
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  const syncCalendar = async (syncId: string) => {
    setLoading(true);
    try {
      // In production, this would call external calendar APIs
      // For now, we'll create sample events
      const sampleEvents = [
        {
          user_id: user?.id,
          calendar_sync_id: syncId,
          external_event_id: `sample-${Date.now()}`,
          title: 'Training Deadline',
          description: 'Complete GXP Compliance Training',
          start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
          is_synced: true,
        }
      ];

      const { error } = await supabase
        .from('calendar_events')
        .upsert(sampleEvents);

      if (error) throw error;

      toast({
        title: "Calendar Synced",
        description: "Your calendar has been synced with training deadlines.",
      });

      await fetchCalendarEvents();
    } catch (error) {
      console.error('Error syncing calendar:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync calendar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    syncSettings,
    events,
    loading,
    connectProvider,
    disconnectProvider,
    syncCalendar,
    refreshData: () => {
      fetchSyncSettings();
      fetchCalendarEvents();
    }
  };
};
