
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

interface H5PSettingsProps {
  settings: {
    baseUrl: string;
    enableTracking: boolean;
    enableDownload: boolean;
    enableEmbed: boolean;
    enableCopyright: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

const H5PSettings = ({ settings, onSettingsChange }: H5PSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          H5P Configuration
        </CardTitle>
        <CardDescription>
          Configure H5P integration settings and behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="h5p-base-url">H5P Base URL</Label>
          <Input
            id="h5p-base-url"
            value={settings.baseUrl}
            onChange={(e) => onSettingsChange(prev => ({ ...prev, baseUrl: e.target.value }))}
            placeholder="https://h5p.org"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-tracking">Enable xAPI Tracking</Label>
            <input
              id="enable-tracking"
              type="checkbox"
              checked={settings.enableTracking}
              onChange={(e) => onSettingsChange(prev => ({ ...prev, enableTracking: e.target.checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-download">Enable Download</Label>
            <input
              id="enable-download"
              type="checkbox"
              checked={settings.enableDownload}
              onChange={(e) => onSettingsChange(prev => ({ ...prev, enableDownload: e.target.checked }))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default H5PSettings;
