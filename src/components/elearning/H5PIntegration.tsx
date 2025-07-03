
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import H5PSettings from './h5p/H5PSettings';
import H5PContentForm from './h5p/H5PContentForm';
import H5PContentPlayer from './h5p/H5PContentPlayer';
import H5PContentLibrary from './h5p/H5PContentLibrary';

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
    
    // Check if H5P is available and has the external dispatcher
    if (typeof window !== 'undefined' && window.H5P?.externalDispatcher) {
      try {
        window.H5P.externalDispatcher.on('xAPI', (event: H5P.XAPIEvent) => {
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
          const score = event.getScore();
          if (score) {
            updateContentStats(content.id, 'score', score.scaled * 100);
          }
        });
      } catch (error) {
        console.warn('H5P event listener setup failed:', error);
      }
    } else {
      console.warn('H5P library not found or external dispatcher not available');
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

  const handleContentAdd = (newContent: H5PContent) => {
    setContents(prev => [...prev, newContent]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">H5P Integration</h2>
        <p className="text-muted-foreground">
          Create, embed, and track interactive H5P content and activities
        </p>
      </div>

      <H5PSettings 
        settings={h5pSettings} 
        onSettingsChange={setH5pSettings} 
      />

      <H5PContentForm onContentAdd={handleContentAdd} />

      {selectedContent && (
        <H5PContentPlayer 
          content={selectedContent} 
          onClose={() => setSelectedContent(null)} 
        />
      )}

      <H5PContentLibrary 
        contents={contents} 
        onPlay={embedH5PContent} 
      />
    </div>
  );
};

export default H5PIntegration;
