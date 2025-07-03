
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Play, Puzzle, BarChart3 } from 'lucide-react';

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

interface H5PContentCardProps {
  content: H5PContent;
  onPlay: (content: H5PContent) => void;
}

const H5PContentCard = ({ content, onPlay }: H5PContentCardProps) => {
  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case 'Interactive Video':
        return 'bg-purple-100 text-purple-800';
      case 'Quiz':
        return 'bg-blue-100 text-blue-800';
      case 'Interactive Presentation':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{content.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getContentTypeColor(content.contentType)}>
              {content.contentType}
            </Badge>
            {content.isEmbedded && (
              <Badge className="bg-green-100 text-green-800">
                Embedded
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Analytics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{content.interactions}</div>
            <div className="text-sm text-muted-foreground">Interactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{content.completions}</div>
            <div className="text-sm text-muted-foreground">Completions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{content.averageScore.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </div>
        </div>

        {/* Completion Rate */}
        {content.interactions > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm text-muted-foreground">
                {((content.completions / content.interactions) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(content.completions / content.interactions) * 100} />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPlay(content)}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Play Content
          </Button>
          <Button variant="outline" size="sm">
            <Puzzle className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-1" />
            Analytics
          </Button>
        </div>

        {/* Metadata */}
        <div className="text-xs text-muted-foreground">
          Created: {new Date(content.createdAt).toLocaleDateString()}
          {content.lastInteraction && (
            <span className="ml-4">
              Last interaction: {new Date(content.lastInteraction).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default H5PContentCard;
