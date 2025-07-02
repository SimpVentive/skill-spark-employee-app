
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Linkedin, Award, Users, BookOpen } from 'lucide-react';
import { useState } from 'react';

const LinkedInLearning = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const features = [
    "Sync skill endorsements",
    "Import learning history",
    "Track certification progress",
    "Connect with professional network"
  ];

  const handleConnect = () => {
    console.log('Connecting LinkedIn Learning API');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Linkedin className="h-6 w-6 text-blue-700" />
          <CardTitle>LinkedIn Learning</CardTitle>
        </div>
        <CardDescription>
          Sync skills, endorsements, and learning history from LinkedIn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="linkedin-enabled">Enable LinkedIn Integration</Label>
          <Switch
            id="linkedin-enabled"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>
        
        {isEnabled && (
          <>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2 mt-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg flex-1">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Skills Sync</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg flex-1">
                <BookOpen className="h-4 w-4 text-green-600" />
                <span className="text-sm">Course History</span>
              </div>
            </div>
            
            <Button onClick={handleConnect} className="w-full">
              Connect LinkedIn Learning
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkedInLearning;
