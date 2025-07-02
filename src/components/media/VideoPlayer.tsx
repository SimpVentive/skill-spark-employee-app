
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, FileText, ExternalLink, Plus } from 'lucide-react';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  url: string;
  provider: 'youtube' | 'vimeo' | 'direct';
  thumbnail?: string;
  duration?: string;
}

interface DocumentContent {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'pdf' | 'doc' | 'presentation';
}

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentContent | null>(null);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    url: '',
    provider: 'youtube',
    type: 'video'
  });

  // Sample content - in a real app, this would come from your database
  const sampleVideos: VideoContent[] = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      description: 'Learn the basics of React Hooks with practical examples.',
      url: 'https://www.youtube.com/embed/O6P86uwfdR0',
      provider: 'youtube',
      thumbnail: 'https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg',
      duration: '15:30'
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Deep dive into TypeScript advanced features and patterns.',
      url: 'https://player.vimeo.com/video/123456789',
      provider: 'vimeo',
      duration: '22:45'
    }
  ];

  const sampleDocuments: DocumentContent[] = [
    {
      id: '1',
      title: 'React Best Practices Guide',
      description: 'Comprehensive guide covering React development best practices.',
      url: 'https://example.com/react-guide.pdf',
      type: 'pdf'
    },
    {
      id: '2',
      title: 'TypeScript Handbook',
      description: 'Complete reference for TypeScript language features.',
      url: 'https://example.com/typescript-handbook.pdf',
      type: 'pdf'
    }
  ];

  const renderVideoPlayer = (video: VideoContent) => {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={video.url}
          title={video.title}
          className="w-full h-full rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  };

  const renderDocumentViewer = (document: DocumentContent) => {
    if (document.type === 'pdf') {
      return (
        <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-semibold mb-2">{document.title}</p>
            <p className="text-sm text-gray-600 mb-4">{document.description}</p>
            <Button 
              onClick={() => window.open(document.url, '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open PDF Document
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  const extractVideoId = (url: string, provider: string) => {
    if (provider === 'youtube') {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    } else if (provider === 'vimeo') {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const generateEmbedUrl = (url: string, provider: string) => {
    const videoId = extractVideoId(url, provider);
    if (!videoId) return url;

    if (provider === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (provider === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Media Content</h2>
        <p className="text-muted-foreground">
          Watch video lectures and access learning documents
        </p>
      </div>

      {/* Video Player Section */}
      {selectedVideo && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{selectedVideo.title}</CardTitle>
            <CardDescription>{selectedVideo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderVideoPlayer(selectedVideo)}
            <div className="mt-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedVideo(null)}
              >
                Back to Library
              </Button>
              {selectedVideo.duration && (
                <span className="text-sm text-muted-foreground">
                  Duration: {selectedVideo.duration}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Viewer Section */}
      {selectedDocument && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{selectedDocument.title}</CardTitle>
            <CardDescription>{selectedDocument.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderDocumentViewer(selectedDocument)}
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedDocument(null)}
              >
                Back to Library
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Library */}
      {!selectedVideo && !selectedDocument && (
        <>
          {/* Video Library */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Video Lectures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleVideos.map((video) => (
                <Card key={video.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                          <Play className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded capitalize">
                          {video.provider}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Button 
                        size="sm"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                      {video.duration && (
                        <span className="text-sm text-muted-foreground">
                          {video.duration}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Document Library */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Learning Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleDocuments.map((doc) => (
                <Card key={doc.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Button 
                        size="sm"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded uppercase">
                        {doc.type}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
