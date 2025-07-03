
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Youtube, Video, Play, Pause, SkipForward, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface VideoContent {
  id: string;
  title: string;
  description: string;
  provider: 'youtube' | 'vimeo';
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  watchTime: number;
  completionRate: number;
  addedAt: string;
  lastWatched?: string;
}

interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  watchedPercentage: number;
}

const VideoAPIIntegration = () => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    watchedPercentage: 0
  });
  const [apiSettings, setApiSettings] = useState({
    youtubeApiKey: '',
    vimeoAccessToken: '',
    enableTracking: true,
    autoplay: false
  });
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Sample video content
  const sampleVideos: VideoContent[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals - Complete Course',
      description: 'Learn JavaScript from scratch with this comprehensive tutorial covering all the basics.',
      provider: 'youtube',
      videoId: 'O6P86uwfdR0',
      embedUrl: 'https://www.youtube.com/embed/O6P86uwfdR0',
      thumbnailUrl: 'https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg',
      duration: 3600,
      views: 245,
      watchTime: 2800,
      completionRate: 78,
      addedAt: '2024-01-15T10:00:00Z',
      lastWatched: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      description: 'Explore advanced React patterns and best practices for building scalable applications.',
      provider: 'vimeo',
      videoId: '123456789',
      embedUrl: 'https://player.vimeo.com/video/123456789',
      thumbnailUrl: 'https://vumbnail.com/123456789.jpg',
      duration: 2400,
      views: 156,
      watchTime: 1900,
      completionRate: 79,
      addedAt: '2024-01-10T09:00:00Z',
      lastWatched: '2024-01-19T16:45:00Z'
    }
  ];

  useEffect(() => {
    setVideos(sampleVideos);
  }, []);

  const extractVideoId = (url: string, provider: 'youtube' | 'vimeo') => {
    if (provider === 'youtube') {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : null;
    } else if (provider === 'vimeo') {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const getVideoProvider = (url: string): 'youtube' | 'vimeo' | null => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    return null;
  };

  const addVideoContent = async () => {
    if (!newVideoUrl) {
      toast.error('Please enter a video URL');
      return;
    }

    const provider = getVideoProvider(newVideoUrl);
    if (!provider) {
      toast.error('Unsupported video provider. Please use YouTube or Vimeo URLs.');
      return;
    }

    const videoId = extractVideoId(newVideoUrl, provider);
    if (!videoId) {
      toast.error('Could not extract video ID from URL');
      return;
    }

    try {
      let videoData: any = {};

      if (provider === 'youtube' && apiSettings.youtubeApiKey) {
        // Fetch video data from YouTube API
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiSettings.youtubeApiKey}&part=snippet,contentDetails,statistics`
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          const video = data.items[0];
          videoData = {
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnailUrl: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
            duration: parseDuration(video.contentDetails.duration),
            views: parseInt(video.statistics.viewCount) || 0
          };
        }
      } else if (provider === 'vimeo' && apiSettings.vimeoAccessToken) {
        // Fetch video data from Vimeo API
        const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
          headers: {
            'Authorization': `Bearer ${apiSettings.vimeoAccessToken}`
          }
        });
        const data = await response.json();
        
        videoData = {
          title: data.name,
          description: data.description,
          thumbnailUrl: data.pictures.sizes[data.pictures.sizes.length - 1].link,
          duration: data.duration,
          views: data.stats.plays || 0
        };
      }

      const newVideo: VideoContent = {
        id: Date.now().toString(),
        title: videoData.title || `${provider} Video ${videoId}`,
        description: videoData.description || 'No description available',
        provider,
        videoId,
        embedUrl: provider === 'youtube' 
          ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1`
          : `https://player.vimeo.com/video/${videoId}`,
        thumbnailUrl: videoData.thumbnailUrl || '',
        duration: videoData.duration || 0,
        views: videoData.views || 0,
        watchTime: 0,
        completionRate: 0,
        addedAt: new Date().toISOString()
      };

      setVideos(prev => [...prev, newVideo]);
      setNewVideoUrl('');
      toast.success('Video added successfully');
    } catch (error) {
      toast.error('Failed to fetch video data. Using basic information.');
      
      // Add video with basic information
      const basicVideo: VideoContent = {
        id: Date.now().toString(),
        title: `${provider} Video ${videoId}`,
        description: 'No description available',
        provider,
        videoId,
        embedUrl: provider === 'youtube' 
          ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1`
          : `https://player.vimeo.com/video/${videoId}`,
        thumbnailUrl: provider === 'youtube' 
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : '',
        duration: 0,
        views: 0,
        watchTime: 0,
        completionRate: 0,
        addedAt: new Date().toISOString()
      };

      setVideos(prev => [...prev, basicVideo]);
      setNewVideoUrl('');
    }
  };

  const parseDuration = (duration: string): number => {
    // Parse YouTube duration format (PT15M33S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    return hours * 3600 + minutes * 60 + seconds;
  };

  const playVideo = (video: VideoContent) => {
    setSelectedVideo(video);
    
    // Initialize video tracking
    if (apiSettings.enableTracking) {
      const trackingInterval = setInterval(() => {
        // Simulate video progress tracking
        setPlayerState(prev => {
          const newCurrentTime = prev.currentTime + 1;
          const newWatchedPercentage = video.duration > 0 ? (newCurrentTime / video.duration) * 100 : 0;
          
          return {
            ...prev,
            currentTime: newCurrentTime,
            watchedPercentage: Math.min(newWatchedPercentage, 100)
          };
        });
        
        // Update video watch time
        setVideos(prevVideos => prevVideos.map(v => 
          v.id === video.id 
            ? { ...v, watchTime: v.watchTime + 1, lastWatched: new Date().toISOString() }
            : v
        ));
      }, 1000);

      // Store interval ID for cleanup
      (window as any).videoTrackingInterval = trackingInterval;
    }
    
    toast.success(`Now playing: ${video.title}`);
  };

  const stopVideo = () => {
    if ((window as any).videoTrackingInterval) {
      clearInterval((window as any).videoTrackingInterval);
    }
    
    setSelectedVideo(null);
    setPlayerState({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 100,
      watchedPercentage: 0
    });
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">YouTube/Vimeo API Integration</h2>
        <p className="text-muted-foreground">
          Embed, track, and analyze video content from YouTube and Vimeo
        </p>
      </div>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            Configure YouTube and Vimeo API credentials for enhanced features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="youtube-api-key">YouTube API Key</Label>
              <Input
                id="youtube-api-key"
                type="password"
                value={apiSettings.youtubeApiKey}
                onChange={(e) => setApiSettings(prev => ({ ...prev, youtubeApiKey: e.target.value }))}
                placeholder="Enter YouTube Data API v3 key"
              />
            </div>
            <div>
              <Label htmlFor="vimeo-access-token">Vimeo Access Token</Label>
              <Input
                id="vimeo-access-token"
                type="password"
                value={apiSettings.vimeoAccessToken}
                onChange={(e) => setApiSettings(prev => ({ ...prev, vimeoAccessToken: e.target.value }))}
                placeholder="Enter Vimeo API access token"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-video-tracking">Enable Video Tracking</Label>
              <input
                id="enable-video-tracking"
                type="checkbox"
                checked={apiSettings.enableTracking}
                onChange={(e) => setApiSettings(prev => ({ ...prev, enableTracking: e.target.checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-autoplay">Enable Autoplay</Label>
              <input
                id="enable-autoplay"
                type="checkbox"
                checked={apiSettings.autoplay}
                onChange={(e) => setApiSettings(prev => ({ ...prev, autoplay: e.target.checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Video */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Add Video Content
          </CardTitle>
          <CardDescription>
            Add YouTube or Vimeo videos by URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="video-url">Video URL</Label>
            <Input
              id="video-url"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
            />
          </div>
          <Button onClick={addVideoContent} className="w-full">
            <Video className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </CardContent>
      </Card>

      {/* Video Player */}
      {selectedVideo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-600" />
              Now Playing: {selectedVideo.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full mb-4">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                className="w-full h-full rounded-lg"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            
            {/* Video Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{playerState.watchedPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={playerState.watchedPercentage} />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={stopVideo}>
                Close Player
              </Button>
              <Badge variant="outline">
                {selectedVideo.provider === 'youtube' ? 'YouTube' : 'Vimeo'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Library */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Video Library</h3>
        <div className="grid gap-4">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={video.provider === 'youtube' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                      {video.provider === 'youtube' ? 'YouTube' : 'Vimeo'}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{video.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Analytics */}
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{video.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{formatDuration(video.watchTime)}</div>
                    <div className="text-xs text-muted-foreground">Watch Time</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{video.completionRate}%</div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{formatDuration(video.duration)}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => playVideo(video)}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Play Video
                  </Button>
                  <Button variant="outline" size="sm">
                    Analytics
                  </Button>
                </div>

                {/* Metadata */}
                <div className="text-xs text-muted-foreground">
                  Added: {new Date(video.addedAt).toLocaleDateString()}
                  {video.lastWatched && (
                    <span className="ml-4">
                      Last watched: {new Date(video.lastWatched).toLocaleDateString()}
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

export default VideoAPIIntegration;
