
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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

interface SCORMPlayerStatusProps {
  selectedPackage: SCORMPackage | null;
}

const SCORMPlayerStatus = ({ selectedPackage }: SCORMPlayerStatusProps) => {
  if (!selectedPackage) return null;

  return (
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
  );
};

export default SCORMPlayerStatus;
