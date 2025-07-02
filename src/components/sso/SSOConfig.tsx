import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Shield, Settings, CheckCircle } from 'lucide-react';

interface SSOConfig {
  id?: string;
  provider: string;
  domain: string;
  client_id?: string;
  issuer_url?: string;
  metadata_url?: string;
  is_active: boolean;
}

const SSOConfig = () => {
  const [configs, setConfigs] = useState<SSOConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newConfig, setNewConfig] = useState<SSOConfig>({
    provider: 'okta',
    domain: '',
    client_id: '',
    issuer_url: '',
    metadata_url: '',
    is_active: true,
  });
  const { user } = useAuth();

  const fetchConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from('sso_configurations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConfigs(data || []);
    } catch (error) {
      console.error('Error fetching SSO configs:', error);
      toast.error('Failed to load SSO configurations');
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('sso_configurations')
        .insert({
          ...newConfig,
        });

      if (error) throw error;

      toast.success('SSO configuration saved successfully!');
      fetchConfigs();
      setNewConfig({
        provider: 'okta',
        domain: '',
        client_id: '',
        issuer_url: '',
        metadata_url: '',
        is_active: true,
      });
    } catch (error) {
      console.error('Error saving SSO config:', error);
      toast.error('Failed to save SSO configuration');
    } finally {
      setSaving(false);
    }
  };

  const toggleConfig = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('sso_configurations')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      toast.success(`SSO configuration ${isActive ? 'enabled' : 'disabled'}`);
      fetchConfigs();
    } catch (error) {
      console.error('Error updating SSO config:', error);
      toast.error('Failed to update SSO configuration');
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading SSO configurations...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold">Single Sign-On Configuration</h2>
        </div>
        <p className="text-muted-foreground">
          Configure SSO providers for secure authentication
        </p>
      </div>

      {/* Add New SSO Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Add SSO Provider
          </CardTitle>
          <CardDescription>
            Configure a new SSO provider for your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select
                value={newConfig.provider}
                onValueChange={(value) => setNewConfig(prev => ({ ...prev, provider: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="okta">Okta</SelectItem>
                  <SelectItem value="auth0">Auth0</SelectItem>
                  <SelectItem value="microsoft">Microsoft Entra ID</SelectItem>
                  <SelectItem value="google">Google Workspace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Domain</Label>
              <Input
                placeholder="company.com"
                value={newConfig.domain}
                onChange={(e) => setNewConfig(prev => ({ ...prev, domain: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Client ID</Label>
              <Input
                placeholder="Enter client ID"
                value={newConfig.client_id}
                onChange={(e) => setNewConfig(prev => ({ ...prev, client_id: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Issuer URL</Label>
              <Input
                placeholder="https://your-domain.okta.com"
                value={newConfig.issuer_url}
                onChange={(e) => setNewConfig(prev => ({ ...prev, issuer_url: e.target.value }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Metadata URL</Label>
              <Input
                placeholder="https://your-domain.okta.com/.well-known/openid_configuration"
                value={newConfig.metadata_url}
                onChange={(e) => setNewConfig(prev => ({ ...prev, metadata_url: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={newConfig.is_active}
                onCheckedChange={(checked) => setNewConfig(prev => ({ ...prev, is_active: checked }))}
              />
              <Label>Enable this configuration</Label>
            </div>
          </div>

          <Button 
            onClick={saveConfig} 
            disabled={saving || !newConfig.domain}
            className="w-full"
          >
            {saving ? 'Saving...' : 'Add SSO Configuration'}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Configurations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Configurations</h3>
        {configs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No SSO configurations found. Add one above to get started.
            </CardContent>
          </Card>
        ) : (
          configs.map((config) => (
            <Card key={config.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold capitalize">{config.provider}</h4>
                      {config.is_active && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Domain: {config.domain}
                    </p>
                    {config.issuer_url && (
                      <p className="text-sm text-muted-foreground">
                        Issuer: {config.issuer_url}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.is_active}
                      onCheckedChange={(checked) => toggleConfig(config.id!, checked)}
                    />
                    <Label className="text-sm">
                      {config.is_active ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SSOConfig;
