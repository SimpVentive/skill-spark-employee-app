
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { tool_id, user_id, context_id, resource_link_id, return_url } = await req.json()

    // Get tool information
    const { data: tool, error: toolError } = await supabase
      .from('lti_tools')
      .select(`
        *,
        lti_providers (*)
      `)
      .eq('id', tool_id)
      .single()

    if (toolError || !tool) {
      throw new Error('Tool not found')
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user_id)
      .single()

    if (profileError) {
      throw new Error('User profile not found')
    }

    // Generate OAuth 1.0 parameters for LTI 1.1
    const timestamp = Math.floor(Date.now() / 1000)
    const nonce = crypto.randomUUID().replace(/-/g, '')

    // Create launch parameters
    const launchParams = {
      lti_message_type: 'basic-lti-launch-request',
      lti_version: tool.lti_providers.lti_version || 'LTI-1p1',
      resource_link_id: resource_link_id || crypto.randomUUID(),
      resource_link_title: tool.name,
      user_email: profile.email || '',
      user_roles: 'Learner',
      lis_person_name_given: profile.full_name?.split(' ')[0] || '',
      lis_person_name_family: profile.full_name?.split(' ').slice(1).join(' ') || '',
      lis_person_name_full: profile.full_name || '',
      lis_person_contact_email_primary: profile.email || '',
      context_id: context_id || 'skillspark-context',
      context_title: 'SkillSpark Learning Platform',
      context_label: 'SkillSpark',
      tool_consumer_instance_guid: 'skillspark.app',
      tool_consumer_instance_name: 'SkillSpark',
      tool_consumer_instance_description: 'Corporate Learning Platform',
      oauth_consumer_key: tool.consumer_key,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_version: '1.0',
      return_url: return_url || `${req.headers.get('origin')}/catalog`
    }

    // Generate OAuth signature (simplified - in production use proper OAuth library)
    const baseString = 'POST&' + 
      encodeURIComponent(tool.launch_url) + '&' +
      encodeURIComponent(Object.entries(launchParams)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&'))

    const signingKey = encodeURIComponent(tool.consumer_secret_encrypted || '') + '&'
    
    // Create HMAC-SHA1 signature
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(signingKey),
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    )
    
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(baseString)
    )
    
    const oauth_signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    
    // Add signature to launch params
    launchParams.oauth_signature = oauth_signature

    // Create launch record
    const { data: launch, error: launchError } = await supabase
      .from('lti_launches')
      .insert({
        user_id,
        tool_id,
        launch_url: tool.launch_url,
        return_url,
        lti_message_type: launchParams.lti_message_type,
        lti_version: launchParams.lti_version,
        resource_link_id: launchParams.resource_link_id,
        resource_link_title: launchParams.resource_link_title,
        context_id: launchParams.context_id,
        context_title: launchParams.context_title,
        context_label: launchParams.context_label,
        user_email: launchParams.user_email,
        user_roles: launchParams.user_roles,
        lis_person_name_given: launchParams.lis_person_name_given,
        lis_person_name_family: launchParams.lis_person_name_family,
        lis_person_name_full: launchParams.lis_person_name_full,
        lis_person_contact_email_primary: launchParams.lis_person_contact_email_primary,
        tool_consumer_instance_guid: launchParams.tool_consumer_instance_guid,
        tool_consumer_instance_name: launchParams.tool_consumer_instance_name,
        tool_consumer_instance_description: launchParams.tool_consumer_instance_description,
        oauth_consumer_key: launchParams.oauth_consumer_key,
        oauth_nonce: launchParams.oauth_nonce,
        oauth_signature: launchParams.oauth_signature,
        oauth_signature_method: launchParams.oauth_signature_method,
        oauth_timestamp: launchParams.oauth_timestamp,
        oauth_version: launchParams.oauth_version,
        launch_parameters: launchParams,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown'
      })
      .select()
      .single()

    if (launchError) {
      throw new Error('Failed to create launch record')
    }

    return new Response(
      JSON.stringify({
        success: true,
        launch_id: launch.id,
        launch_url: tool.launch_url,
        launch_params: launchParams
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('LTI Launch error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
