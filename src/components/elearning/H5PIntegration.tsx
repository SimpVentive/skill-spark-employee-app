
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Puzzle, Play, Upload, Settings, BarChart3 } from 'lucide-react';
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

const H5PIntegration = () => {
  const [contents, setContents] = useState<H5PContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<H5PContent | null>(null);
  const [h5pSettings, setH5pSettings] = useState({
    baseUrl: 'https://h5p.org',
    enableTracking: true,
    enableDownload: false,
    enableEmbed: true,
    enableCopyright: true
  });
  const [newContentUrl, setNewContentUrl] = useState('');

  // Sample H5P content
  const sampleContents: H5PContent[] = [
    {
      id: '1',
      title: 'Interactive Video: JavaScript Basics',
      contentType: 'Interactive Video',
      description: 'An interactive video tutorial covering JavaScript fundamentals',
      embedCode: '<iframe src="https://h5p.org/h5p/embed/617" width="1091" height="674" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>',
      isEmbedded: true,
      interactions: 245,
      completions: 198,
      averageScore: 87.5,
      createdAt: '2024-01-15T10:00:00Z',
      lastInteraction: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      title: 'Quiz: HTML & CSS Knowledge Check',
      contentType: 'Quiz',
      description: 'Test your knowledge of HTML and CSS concepts',
      embedCode: '<iframe src="https://h5p.org/h5p/embed/618" width="1091" height="574" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>',
      isEmbedded: true,
      interactions: 156,
      completions: 142,
      averageScore: 92.3,
      createdAt: '2024-01-10T09:00:00Z',
      lastInteraction: '2024-01-19T16:45:00Z'
    },
    {
      id: '3',
      title: 'Interactive Presentation: React Components',
      contentType: 'Interactive Presentation',
      description: 'Learn about React components through an interactive presentation',
      embedCode: '<iframe src="https://h5p.org/h5p/embed/619" width="1091" height="674" frameborder="0" allowfullscreen="allowfullscreen" allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"></iframe>',
      isEmbedded: false,
      interactions: 89,
      completions: 76,
      averageScore: 84.2,
      createdAt: '2024-01-08T11:00:00Z'
    }
  ];

  useEffect(() => {
    setContents(sampleContents);
  }, []);

  const embedH5PContent = (content: H5PContent) => {
    setSelectedContent(content);
    
    // Initialize H5P event listeners
    if (window.H5P) {
      window.H5P.externalDispatcher.on('xAPI', (event: any) => {
        console.log('H5P xAPI Event:', event);
        
        // Track interactions
        if (event.getVerb() === 'interacted') {
          updateContentStats(content.id, 'interaction');
        }
        
        // Track completions
        if (event.getVerb() === 'completed') {
          updateContentStats(content.id, 'completion');
        }
        
        // Track scores
        if (event.getScore()) {
          updateContentStats(content.id, 'score', event.getScore().scaled * 100);
        }
      });
    }
    
    toast.success(`Embedded: ${content.title}`);
  };

  const updateContentStats = (contentId: string, type: 'interaction' | 'completion' | 'score', value?: number) => {
    setContents(prev => prev.map(content => {
      if (content.id === contentId) {
        const updated = { ...content };
        
        switch (type) {
          case 'interaction':
            updated.interactions += 1;
            updated.lastInteraction = new Date().toISOString();
            break;
          case 'completion':
            updated.completions += 1;
            break;
          case 'score':
            if (value !== undefined) {
              // Update average score
              const totalScore = updated.averageScore * updated.completions + value;
              updated.averageScore = totalScore / (updated.completions + 1);
            }
            break;
        }
        
        return updated;
      }
      return content;
    }));
  };

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

      setContents(prev => [...prev, newContent]);
      setNewContentUrl('');
      toast.success('H5P content added successfully');
    } catch (error) {
      toast.error('Failed to add H5P content');
    }
  };

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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">H5P Integration</h2>
        <p className="text-muted-foreground">
          Create, embed, and track interactive H5P content and activities
        </p>
      </div>

      {/* H5P Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            H5P Configuration
          </CardTitle>
          <CardDescription>
            Configure H5P integration settings and behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="h5p-base-url">H5P Base URL</Label>
            <Input
              id="h5p-base-url"
              value={h5pSettings.baseUrl}
              onChange={(e) => setH5pSettings(prev => ({ ...prev, baseUrl: e.target.value }))}
              placeholder="https://h5p.org"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-tracking">Enable xAPI Tracking</Label>
              <input
                id="enable-tracking"
                type="checkbox"
                checked={h5pSettings.enableTracking}
                onChange={(e) => setH5pSettings(prev => ({ ...prev, enableTracking: e.target.checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-download">Enable Download</Label>
              <input
                id="enable-download"
                type="checkbox"
                checked={h5pSettings.enableDownload}
                onChange={(e) => setH5pSettings(prev => ({ ...prev, enableDownload: e.target.checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New H5P Content */}
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

      {/* Currently Playing Content */}
      {selectedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-600" />
              Currently Playing: {selectedContent.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderH5PContent(selectedContent)}
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedContent(null)}
              >
                Close Content
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* H5P Content Library */}
      <div>
        <h3 className="text-xl font-semibold mb-4">H5P Content Library</h3>
        <div className="grid gap-4">
          {contents.map((content) => (
            <Card key={content.id}>
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
                    onClick={() => embedH5PContent(content)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default H5PIntegration;
