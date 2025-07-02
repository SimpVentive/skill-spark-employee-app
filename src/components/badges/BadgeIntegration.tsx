import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Award, ExternalLink, Plus, Settings } from 'lucide-react';

interface ExternalBadge {
  id?: string;
  name: string;
  description: string;
  badge_type: string;
  criteria: string;
  points_value: number;
  provider: string;
  external_badge_id: string;
  image_url?: string;
  is_active: boolean;
}

const BadgeIntegration = () => {
  const [badges, setBadges] = useState<ExternalBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newBadge, setNewBadge] = useState<ExternalBadge>({
    name: '',
    description: '',
    badge_type: 'achievement',
    criteria: '',
    points_value: 100,
    provider: 'badgr',
    external_badge_id: '',
    image_url: '',
    is_active: true,
  });
  const { user } = useAuth();

  const fetchBadges = async () => {
    try {
      const { data, error } = await supabase
        .from('badges')
        .select('*')
        .not('provider', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBadges(data || []);
    } catch (error) {
      console.error('Error fetching external badges:', error);
      toast.error('Failed to load badge integrations');
    } finally {
      setLoading(false);
    }
  };

  const saveBadge = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('badges')
        .insert({
          ...newBadge,
        });

      if (error) throw error;

      toast.success('Badge integration created successfully!');
      fetchBadges();
      setNewBadge({
        name: '',
        description: '',
        badge_type: 'achievement',
        criteria: '',
        points_value: 100,
        provider: 'badgr',
        external_badge_id: '',
        image_url: '',
        is_active: true,
      });
    } catch (error) {
      console.error('Error saving badge:', error);
      toast.error('Failed to create badge integration');
    } finally {
      setSaving(false);
    }
  };

  const toggleBadge = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('badges')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Badge ${isActive ? 'enabled' : 'disabled'}`);
      fetchBadges();
    } catch (error) {
      console.error('Error updating badge:', error);
      toast.error('Failed to update badge');
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading badge integrations...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Award className="h-8 w-8 text-yellow-600 mr-3" />
          <h2 className="text-3xl font-bold">Badge Integration</h2>
        </div>
        <p className="text-muted-foreground">
          Connect with Badgr, Credly, and other badge providers
        </p>
      </div>

      {/* Add New Badge Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Badge Integration
          </CardTitle>
          <CardDescription>
            Connect external badge providers to issue verifiable digital credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select
                value={newBadge.provider}
                onValueChange={(value) => setNewBadge(prev => ({ ...prev, provider: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="badgr">Badgr</SelectItem>
                  <SelectItem value="credly">Credly</SelectItem>
                  <SelectItem value="digitalme">DigitalMe</SelectItem>
                  <SelectItem value="openbadges">Open Badges</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Badge Type</Label>
              <Select
                value={newBadge.badge_type}
                onValueChange={(value) => setNewBadge(prev => ({ ...prev, badge_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="skill">Skill</SelectItem>
                  <SelectItem value="completion">Completion</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Badge Name</Label>
              <Input
                placeholder="e.g., Course Completion Badge"
                value={newBadge.name}
                onChange={(e) => setNewBadge(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>External Badge ID</Label>
              <Input
                placeholder="Badge ID from provider"
                value={newBadge.external_badge_id}
                onChange={(e) => setNewBadge(prev => ({ ...prev, external_badge_id: e.target.value }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Badge description and requirements"
                value={newBadge.description}
                onChange={(e) => setNewBadge(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Criteria</Label>
              <Textarea
                placeholder="What learners need to do to earn this badge"
                value={newBadge.criteria}
                onChange={(e) => setNewBadge(prev => ({ ...prev, criteria: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Points Value</Label>
              <Input
                type="number"
                placeholder="100"
                value={newBadge.points_value}
                onChange={(e) => setNewBadge(prev => ({ ...prev, points_value: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Badge Image URL</Label>
              <Input
                placeholder="https://example.com/badge.png"
                value={newBadge.image_url}
                onChange={(e) => setNewBadge(prev => ({ ...prev, image_url: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch
                checked={newBadge.is_active}
                onCheckedChange={(checked) => setNewBadge(prev => ({ ...prev, is_active: checked }))}
              />
              <Label>Enable this badge</Label>
            </div>
          </div>

          <Button 
            onClick={saveBadge} 
            disabled={saving || !newBadge.name || !newBadge.external_badge_id}
            className="w-full"
          >
            {saving ? 'Creating...' : 'Create Badge Integration'}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Badge Integrations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Connected Badge Providers</h3>
        {badges.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No badge integrations found. Add one above to get started.
            </CardContent>
          </Card>
        ) : (
          badges.map((badge) => (
            <Card key={badge.id}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{badge.name}</h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                        {badge.provider}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Type: {badge.badge_type}</span>
                      <span>Points: {badge.points_value}</span>
                      <span>ID: {badge.external_badge_id}</span>
                    </div>
                    {badge.image_url && (
                      <div className="flex items-center gap-2 text-xs">
                        <ExternalLink className="h-3 w-3" />
                        <a 
                          href={badge.image_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Badge Image
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={badge.is_active}
                      onCheckedChange={(checked) => toggleBadge(badge.id!, checked)}
                    />
                    <Label className="text-sm">
                      {badge.is_active ? 'Active' : 'Inactive'}
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

export default BadgeIntegration;
