
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BookOpen } from 'lucide-react';

interface SCORMSettingsProps {
  trackingEnabled: boolean;
  onTrackingChange: (enabled: boolean) => void;
}

const SCORMSettings = ({ trackingEnabled, onTrackingChange }: SCORMSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          SCORM Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="tracking">Enable Progress Tracking</Label>
            <p className="text-sm text-muted-foreground">
              Track learner progress and completion status
            </p>
          </div>
          <Switch
            id="tracking"
            checked={trackingEnabled}
            onCheckedChange={onTrackingChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SCORMSettings;
