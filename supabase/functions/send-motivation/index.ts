
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userId, message, type } = await req.json()

    // Get user notification preferences
    const { data: preferences, error: prefError } = await supabaseClient
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (prefError) {
      console.log('No preferences found, using defaults')
    }

    // Get user profile for email
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single()

    if (profileError) {
      throw new Error('User profile not found')
    }

    const responses = []

    // Send email if enabled (using a mock service - replace with SendGrid/Twilio)
    if (preferences?.email_enabled !== false && profile.email) {
      console.log(`Would send email to ${profile.email}: ${message}`)
      responses.push({ type: 'email', status: 'sent', recipient: profile.email })
    }

    // Send SMS if enabled and phone number exists
    if (preferences?.sms_enabled && preferences?.phone_number) {
      console.log(`Would send SMS to ${preferences.phone_number}: ${message}`)
      responses.push({ type: 'sms', status: 'sent', recipient: preferences.phone_number })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notifications sent',
        responses 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending notifications:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
