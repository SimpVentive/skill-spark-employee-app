
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

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

interface H5PContentPlayerProps {
  content: H5PContent;
  onClose: () => void;
}

const H5PContentPlayer = ({ content, onClose }: H5PContentPlayerProps) => {
  const renderH5PContent = (content: H5PContent) => {
    return (
      <div className="w-full">
        <div 
          dangerouslySetInnerHTML={{ __html: content.embedCode }}
          className="w-full"
        />
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-blue-600" />
          Currently Playing: {content.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderH5PContent(content)}
        <div className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Close Content
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default H5PContentPlayer;
