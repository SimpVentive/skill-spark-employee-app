
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { BookOpen, Upload, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SCORMPackage {
  id: string;
  title: string;
  version: string;
  status: 'active' | 'inactive';
  launchUrl: string;
  manifestPath?: string;
  uploadedAt: string;
  lastLaunched?: string;
}

const SCORMIntegration = () => {
  const [packages, setPackages] = useState<SCORMPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<SCORMPackage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  // Sample SCORM packages - in a real app, this would come from your backend
  const samplePackages: SCORMPackage[] = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      version: 'SCORM 2004',
      status: 'active',
      launchUrl: '/scorm/web-dev/index.html',
      uploadedAt: '2024-01-15T10:00:00Z',
      lastLaunched: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      version: 'SCORM 1.2',
      status: 'active',
      launchUrl: '/scorm/js-advanced/index.html',
      uploadedAt: '2024-01-10T09:00:00Z'
    }
  ];

  useEffect(() => {
    setPackages(samplePackages);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      toast.error('Please upload a ZIP file containing SCORM package');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPackage: SCORMPackage = {
        id: Date.now().toString(),
        title: file.name.replace('.zip', ''),
        version: 'SCORM 2004',
        status: 'active',
        launchUrl: `/scorm/${Date.now()}/index.html`,
        uploadedAt: new Date().toISOString()
      };

      setPackages(prev => [...prev, newPackage]);
      toast.success('SCORM package uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload SCORM package');
    } finally {
      setIsUploading(false);
    }
  };

  const launchSCORM = (pkg: SCORMPackage) => {
    // Initialize SCORM API communication
    const scormAPI = {
      Initialize: () => {
        console.log('SCORM: Initialize called');
        return 'true';
      },
      Terminate: () => {
        console.log('SCORM: Terminate called');
        return 'true';
      },
      GetValue: (element: string) => {
        console.log(`SCORM: GetValue called for ${element}`);
        // Return appropriate values based on SCORM data model
        switch (element) {
          case 'cmi.core.student_id':
            return 'student123';
          case 'cmi.core.student_name':
            return 'John Doe';
          case 'cmi.core.lesson_status':
            return 'not attempted';
          default:
            return '';
        }
      },
      SetValue: (element: string, value: string) => {
        console.log(`SCORM: SetValue called - ${element}: ${value}`);
        return 'true';
      },
      Commit: () => {
        console.log('SCORM: Commit called');
        return 'true';
      }
    };

    // Make API available globally for SCORM content
    (window as any).API = scormAPI;
    (window as any).API_1484_11 = scormAPI;

    // Launch SCORM content in new window
    const scormWindow = window.open(
      pkg.launchUrl,
      'scorm_player',
      'width=1024,height=768,scrollbars=yes,resizable=yes'
    );

    if (scormWindow) {
      setSelectedPackage(pkg);
      toast.success(`Launched: ${pkg.title}`);
    } else {
      toast.error('Failed to launch SCORM package. Please allow popups.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">SCORM Integration</h2>
        <p className="text-muted-foreground">
          Upload, manage, and track SCORM-compliant learning content
        </p>
      </div>

      {/* Settings */}
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
              onCheckedChange={setTrackingEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload SCORM Package
          </CardTitle>
          <CardDescription>
            Upload a ZIP file containing your SCORM-compliant learning content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="scorm-upload">SCORM Package (ZIP)</Label>
            <Input
              id="scorm-upload"
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-sm text-muted-foreground">
                Uploading and processing package...
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SCORM Packages List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">SCORM Packages</h3>
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{pkg.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>
                      {pkg.status}
                    </Badge>
                    <Badge variant="outline">{pkg.version}</Badge>
                  </div>
                </div>
                <CardDescription>
                  Uploaded: {new Date(pkg.uploadedAt).toLocaleDateString()}
                  {pkg.lastLaunched && (
                    <span className="ml-4">
                      Last launched: {new Date(pkg.lastLaunched).toLocaleDateString()}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => launchSCORM(pkg)}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Launch
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SCORM Player Status */}
      {selectedPackage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Currently Playing: {selectedPackage.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              SCORM communication is active. Progress and completion data will be tracked.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SCORMIntegration;
