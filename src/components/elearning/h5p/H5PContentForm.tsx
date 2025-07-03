
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface H5PContent {
  id: string;
  title: string;
  contentType: string;
  description: string;
  embedCode: string;
  isEmbedded: boolean;
  interactions: number;
  completions: number;
  averageScore: number;
  createdAt: string;
  lastInteraction?: string;
}

interface H5PContentFormProps {
  onContentAdd: (content: H5PContent) => void;
}

const H5PContentForm = ({ onContentAdd }: H5PContentFormProps) => {
  const [newContentUrl, setNewContentUrl] = useState('');

  const addH5PContent = async () => {
    if (!newContentUrl) {
      toast.error('Please enter an H5P content URL');
      return;
    }

    try {
      // Extract H5P content ID from URL
      const urlMatch = newContentUrl.match(/\/h5p\/embed\/(\d+)/);
      if (!urlMatch) {
        toast.error('Invalid H5P URL format');
        return;
      }

      const contentId = urlMatch[1];
      const embedCode = `<iframe src="${newContentUrl}" width="1091" height="674" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>`;

      const newContent: H5PContent = {
        id: Date.now().toString(),
        title: `H5P Content ${contentId}`,
        contentType: 'Unknown',
        description: 'Imported H5P content',
        embedCode,
        isEmbedded: false,
        interactions: 0,
        completions: 0,
        averageScore: 0,
        createdAt: new Date().toISOString()
      };

      onContentAdd(newContent);
      setNewContentUrl('');
      toast.success('H5P content added successfully');
    } catch (error) {
      toast.error('Failed to add H5P content');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Add H5P Content
        </CardTitle>
        <CardDescription>
          Add H5P content by URL or embed code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="h5p-url">H5P Content URL</Label>
          <Input
            id="h5p-url"
            value={newContentUrl}
            onChange={(e) => setNewContentUrl(e.target.value)}
            placeholder="https://h5p.org/h5p/embed/617"
          />
        </div>
        <Button onClick={addH5PContent} className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          Add H5P Content
        </Button>
      </CardContent>
    </Card>
  );
};

export default H5PContentForm;
