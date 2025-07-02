
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CalendarSync {
  id: string;
  user_id: string;
  provider: 'google' | 'outlook';
  access_token: string | null;
  refresh_token: string | null;
  expires_at: string | null;
  calendar_id: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useCalendarSync = () => {
  const [calendarSyncs, setCalendarSyncs] = useState<CalendarSync[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCalendarSyncs = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('calendar_sync')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Type assertion to ensure provider field matches our interface
      const typedData = data as CalendarSync[];
      setCalendarSyncs(typedData);
    } catch (error) {
      console.error('Error fetching calendar syncs:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectCalendar = async (provider: 'google' | 'outlook') => {
    if (!user) return { error: 'User not authenticated' };

    try {
      // In a real implementation, this would handle OAuth flow
      const { data, error } = await supabase
        .from('calendar_sync')
        .upsert({
          user_id: user.id,
          provider,
          is_active: true,
        }, {
          onConflict: 'user_id,provider'
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchCalendarSyncs();
      return { data };
    } catch (error) {
      console.error('Error connecting calendar:', error);
      return { error };
    }
  };

  const disconnectCalendar = async (syncId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_sync')
        .update({ is_active: false })
        .eq('id', syncId);

      if (error) throw error;
      
      await fetchCalendarSyncs();
    } catch (error) {
      console.error('Error disconnecting calendar:', error);
    }
  };

  useEffect(() => {
    fetchCalendarSyncs();
  }, [user]);

  return {
    calendarSyncs,
    loading,
    connectCalendar,
    disconnectCalendar,
    refetch: fetchCalendarSyncs,
  };
};
