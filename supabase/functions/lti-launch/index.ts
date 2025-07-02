
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

// Helper function to generate JWT for LTI 1.3
async function generateLTI13JWT(tool: any, profile: any, launchData: any) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: 'skillspark-key-1'
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: tool.lti_providers.issuer || 'https://skillspark.app',
    sub: profile.id,
    aud: tool.client_id,
    exp: now + 3600, // 1 hour
    iat: now,
    nonce: crypto.randomUUID(),
    
    // LTI 1.3 specific claims
    'https://purl.imsglobal.org/spec/lti/claim/message_type': 'LtiResourceLinkRequest',
    'https://purl.imsglobal.org/spec/lti/claim/version': '1.3.0',
    'https://purl.imsglobal.org/spec/lti/claim/deployment_id': tool.lti_providers.deployment_id || 'skillspark-deployment',
    'https://purl.imsglobal.org/spec/lti/claim/target_link_uri': tool.launch_url,
    
    // Resource link
    'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
      id: launchData.resource_link_id,
      title: launchData.resource_link_title,
      description: tool.description
    },
    
    // User context
    'https://purl.imsglobal.org/spec/lti/claim/context': {
      id: launchData.context_id,
      label: launchData.context_label,
      title: launchData.context_title,
      type: ['CourseTemplate']
    },
    
    // Platform instance
    'https://purl.imsglobal.org/spec/lti/claim/tool_platform': {
      guid: launchData.tool_consumer_instance_guid,
      name: launchData.tool_consumer_instance_name,
      version: '1.0',
      product_family_code: 'skillspark'
    },
    
    // Launch presentation
    'https://purl.imsglobal.org/spec/lti/claim/launch_presentation': {
      document_target: 'window',
      return_url: launchData.return_url
    },
    
    // User information
    name: profile.full_name || '',
    given_name: profile.full_name?.split(' ')[0] || '',
    family_name: profile.full_name?.split(' ').slice(1).join(' ') || '',
    email: profile.email || '',
    
    // Roles
    'https://purl.imsglobal.org/spec/lti/claim/roles': [
      'http://purl.imsglobal.org/vocab/lis/v2/membership#Learner'
    ]
  }

  // For demo purposes, we'll create a simple unsigned JWT
  // In production, you'd sign this with your private key
  const encodedHeader = btoa(JSON.stringify(header)).replace(/[=]/g, '')
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/[=]/g, '')
  
  // Create unsigned JWT (for demo - in production you need proper RSA signing)
  return `${encodedHeader}.${encodedPayload}.demo-signature`
}

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

    const ltiVersion = tool.lti_providers.lti_version || 'LTI-1p1'
    
    // Common launch data
    const launchData = {
      resource_link_id: resource_link_id || crypto.randomUUID(),
      resource_link_title: tool.name,
      context_id: context_id || 'skillspark-context',
      context_title: 'SkillSpark Learning Platform',
      context_label: 'SkillSpark',
      tool_consumer_instance_guid: 'skillspark.app',
      tool_consumer_instance_name: 'SkillSpark',
      tool_consumer_instance_description: 'Corporate Learning Platform',
      return_url: return_url || `${req.headers.get('origin')}/catalog`
    }

    let launchParams = {}
    let launchMethod = 'POST'

    if (ltiVersion === 'LTI-1p3') {
      // LTI 1.3 Launch
      const state = crypto.randomUUID()
      const nonce = crypto.randomUUID()
      
      // Generate JWT token
      const idToken = await generateLTI13JWT(tool, profile, launchData)
      
      launchParams = {
        iss: tool.lti_providers.issuer || 'https://skillspark.app',
        login_hint: profile.id,
        target_link_uri: tool.launch_url,
        lti_message_hint: `launch-${tool.id}-${Date.now()}`,
        client_id: tool.client_id,
        deployment_id: tool.lti_providers.deployment_id || 'skillspark-deployment',
        state: state,
        nonce: nonce,
        id_token: idToken
      }
    } else {
      // LTI 1.1 Launch (existing implementation)
      const timestamp = Math.floor(Date.now() / 1000)
      const nonce = crypto.randomUUID().replace(/-/g, '')

      launchParams = {
        lti_message_type: 'basic-lti-launch-request',
        lti_version: ltiVersion,
        resource_link_id: launchData.resource_link_id,
        resource_link_title: launchData.resource_link_title,
        user_email: profile.email || '',
        user_roles: 'Learner',
        lis_person_name_given: profile.full_name?.split(' ')[0] || '',
        lis_person_name_family: profile.full_name?.split(' ').slice(1).join(' ') || '',
        lis_person_name_full: profile.full_name || '',
        lis_person_contact_email_primary: profile.email || '',
        context_id: launchData.context_id,
        context_title: launchData.context_title,
        context_label: launchData.context_label,
        tool_consumer_instance_guid: launchData.tool_consumer_instance_guid,
        tool_consumer_instance_name: launchData.tool_consumer_instance_name,
        tool_consumer_instance_description: launchData.tool_consumer_instance_description,
        oauth_consumer_key: tool.consumer_key,
        oauth_nonce: nonce,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: timestamp,
        oauth_version: '1.0',
        return_url: launchData.return_url
      }

      // Generate OAuth signature for LTI 1.1
      const baseString = 'POST&' + 
        encodeURIComponent(tool.launch_url) + '&' +
        encodeURIComponent(Object.entries(launchParams)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
          .join('&'))

      const signingKey = encodeURIComponent(tool.consumer_secret_encrypted || '') + '&'
      
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
      launchParams.oauth_signature = oauth_signature
    }

    // Create launch record
    const { data: launch, error: launchError } = await supabase
      .from('lti_launches')
      .insert({
        user_id,
        tool_id,
        launch_url: tool.launch_url,
        return_url: launchData.return_url,
        lti_message_type: ltiVersion === 'LTI-1p3' ? 'LtiResourceLinkRequest' : 'basic-lti-launch-request',
        lti_version: ltiVersion,
        resource_link_id: launchData.resource_link_id,
        resource_link_title: launchData.resource_link_title,
        context_id: launchData.context_id,
        context_title: launchData.context_title,
        context_label: launchData.context_label,
        user_email: profile.email,
        user_roles: 'Learner',
        lis_person_name_given: profile.full_name?.split(' ')[0] || '',
        lis_person_name_family: profile.full_name?.split(' ').slice(1).join(' ') || '',
        lis_person_name_full: profile.full_name || '',
        lis_person_contact_email_primary: profile.email || '',
        tool_consumer_instance_guid: launchData.tool_consumer_instance_guid,
        tool_consumer_instance_name: launchData.tool_consumer_instance_name,
        tool_consumer_instance_description: launchData.tool_consumer_instance_description,
        oauth_consumer_key: ltiVersion === 'LTI-1p1' ? tool.consumer_key : null,
        oauth_nonce: ltiVersion === 'LTI-1p1' ? launchParams.oauth_nonce : null,
        oauth_signature: ltiVersion === 'LTI-1p1' ? launchParams.oauth_signature : null,
        oauth_signature_method: ltiVersion === 'LTI-1p1' ? 'HMAC-SHA1' : null,
        oauth_timestamp: ltiVersion === 'LTI-1p1' ? launchParams.oauth_timestamp : null,
        oauth_version: ltiVersion === 'LTI-1p1' ? '1.0' : null,
        id_token: ltiVersion === 'LTI-1p3' ? launchParams.id_token : null,
        state_parameter: ltiVersion === 'LTI-1p3' ? launchParams.state : null,
        nonce_parameter: ltiVersion === 'LTI-1p3' ? launchParams.nonce : null,
        launch_parameters: launchParams,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown'
      })
      .select()
      .single()

    if (launchError) {
      console.error('Launch record error:', launchError)
      throw new Error('Failed to create launch record')
    }

    return new Response(
      JSON.stringify({
        success: true,
        launch_id: launch.id,
        launch_url: tool.launch_url,
        launch_params: launchParams,
        lti_version: ltiVersion,
        launch_method: launchMethod
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
