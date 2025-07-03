
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface SCORMUploaderProps {
  isUploading: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SCORMUploader = ({ isUploading, onFileUpload }: SCORMUploaderProps) => {
  return (
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
            onChange={onFileUpload}
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
  );
};

export default SCORMUploader;
