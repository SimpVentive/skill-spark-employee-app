
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

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

interface SCORMPackageCardProps {
  package: SCORMPackage;
  onLaunch: (pkg: SCORMPackage) => void;
}

const SCORMPackageCard = ({ package: pkg, onLaunch }: SCORMPackageCardProps) => {
  return (
    <Card>
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
            onClick={() => onLaunch(pkg)}
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
  );
};

export default SCORMPackageCard;
