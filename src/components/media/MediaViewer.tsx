
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, FileText, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MediaContent {
  id: string;
  title: string;
  description: string;
  media_type: string;
  provider: string;
  url: string;
  thumbnail_url?: string;
  duration_seconds?: number;
}

const MediaViewer = () => {
  const [media, setMedia] = useState<MediaContent[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('content_media')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media content');
    } finally {
      setLoading(false);
    }
  };

  const renderMediaPlayer = (mediaItem: MediaContent) => {
    if (mediaItem.media_type === 'video') {
      if (mediaItem.provider === 'youtube') {
        return (
          <div className="aspect-video w-full">
            <iframe
              src={mediaItem.url}
              title={mediaItem.title}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        );
      } else if (mediaItem.provider === 'vimeo') {
        return (
          <div className="aspect-video w-full">
            <iframe
              src={mediaItem.url}
              title={mediaItem.title}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        );
      }
    } else if (mediaItem.media_type === 'document' || mediaItem.media_type === 'pdf') {
      return (
        <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-semibold mb-2">{mediaItem.title}</p>
            <p className="text-sm text-gray-600 mb-4">{mediaItem.description}</p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
                onClick={() => window.open(mediaItem.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Document
              </Button>
              <Button 
                size="sm"
                onClick={() => window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(mediaItem.url)}&embedded=true`, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Preview with Google Docs
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Media format not supported</p>
      </div>
    );
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading media content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Learning Media</h2>
        <p className="text-muted-foreground mt-2">
          Access video lectures, documents, and other learning materials
        </p>
      </div>

      {selectedMedia && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{selectedMedia.title}</CardTitle>
            <CardDescription>{selectedMedia.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderMediaPlayer(selectedMedia)}
            <div className="mt-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedMedia(null)}
              >
                Back to Library
              </Button>
              {selectedMedia.duration_seconds && (
                <span className="text-sm text-muted-foreground">
                  Duration: {formatDuration(selectedMedia.duration_seconds)}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="relative">
                {item.thumbnail_url ? (
                  <img 
                    src={item.thumbnail_url} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
                    {item.media_type === 'video' ? (
                      <Play className="h-8 w-8 text-gray-400" />
                    ) : (
                      <FileText className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {item.media_type}
                  </span>
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Button 
                  size="sm"
                  onClick={() => setSelectedMedia(item)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  View
                </Button>
                {item.duration_seconds && (
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(item.duration_seconds)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaViewer;
