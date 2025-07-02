
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const GoogleAnalytics = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [measurementId, setMeasurementId] = useState('');

  const handleConnect = () => {
    // Integration logic will go here
    console.log('Connecting Google Analytics with ID:', measurementId);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <CardTitle>Google Analytics 4</CardTitle>
        </div>
        <CardDescription>
          Track user engagement, course completion rates, and learning patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="ga-enabled">Enable Google Analytics</Label>
          <Switch
            id="ga-enabled"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>
        
        {isEnabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="measurement-id">Measurement ID</Label>
              <Input
                id="measurement-id"
                placeholder="G-XXXXXXXXXX"
                value={measurementId}
                onChange={(e) => setMeasurementId(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Course engagement tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>User behavior analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Completion rate metrics</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Learning path optimization</span>
              </div>
            </div>
            
            <Button onClick={handleConnect} className="w-full">
              Connect Google Analytics
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleAnalytics;
