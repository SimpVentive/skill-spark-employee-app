
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Search, 
  FileText, 
  Video, 
  Image, 
  BookOpen,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle,
  Trash2
} from "lucide-react";
import FeatureIntro from "@/components/shared/FeatureIntro";

const OfflineContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const availableContent = [
    {
      id: 1,
      title: "GXP Compliance Complete Course",
      type: "course",
      format: "Mixed Media",
      size: "2.4 GB",
      modules: 8,
      duration: "40 hours",
      downloadStatus: "available",
      category: "Compliance"
    },
    {
      id: 2,
      title: "Safety Training Videos",
      type: "video",
      format: "MP4",
      size: "1.8 GB",
      modules: 12,
      duration: "6 hours",
      downloadStatus: "available",
      category: "Safety"
    },
    {
      id: 3,
      title: "Leadership Handbook",
      type: "document",
      format: "PDF",
      size: "45 MB",
      modules: 1,
      duration: "3 hours read",
      downloadStatus: "available",
      category: "Leadership"
    },
    {
      id: 4,
      title: "Project Management Templates",
      type: "resources",
      format: "ZIP",
      size: "125 MB",
      modules: 15,
      duration: "N/A",
      downloadStatus: "available",
      category: "Management"
    }
  ];

  const downloadedContent = [
    {
      id: 1,
      title: "GXP Compliance Complete Course",
      type: "course",
      format: "Mixed Media",
      size: "2.4 GB",
      downloadDate: "2025-06-20",
      lastAccessed: "2025-06-25",
      progress: 75,
      status: "in-progress"
    },
    {
      id: 2,
      title: "Safety Training Videos",
      type: "video",
      format: "MP4",
      size: "1.8 GB",
      downloadDate: "2025-06-18",
      lastAccessed: "2025-06-24",
      progress: 100,
      status: "completed"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      case "course":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Image className="h-5 w-5" />;
    }
  };

  const getTotalSize = () => {
    return downloadedContent.reduce((total, item) => {
      const size = parseFloat(item.size.split(' ')[0]);
      const unit = item.size.split(' ')[1];
      return total + (unit === 'GB' ? size : size / 1000);
    }, 0).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Offline Content</h1>
        <p className="text-muted-foreground">Download and access training materials offline</p>
      </div>

      {/* Storage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <HardDrive className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{getTotalSize()} GB</p>
              <p className="text-sm text-muted-foreground">Downloaded</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Download className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{downloadedContent.length}</p>
              <p className="text-sm text-muted-foreground">Items Available</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <WifiOff className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">Yes</p>
              <p className="text-sm text-muted-foreground">Offline Ready</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available for Download</TabsTrigger>
          <TabsTrigger value="downloaded">Downloaded Content</TabsTrigger>
          <TabsTrigger value="settings">Sync Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search available content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {availableContent
              .filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.format}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Size: {item.size}</span>
                        <span>Duration: {item.duration}</span>
                        <span>Modules: {item.modules}</span>
                      </div>

                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="downloaded" className="space-y-4">
          <div className="grid gap-4">
            {downloadedContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.format} • {item.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Downloaded: {item.downloadDate}</span>
                        <span>Last accessed: {item.lastAccessed}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        {item.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-blue-600" />
                        )}
                        <Badge variant={item.status === "completed" ? "default" : "secondary"}>
                          {item.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Open
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Download Settings</CardTitle>
              <CardDescription>Configure how content is downloaded and synced</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-download new content</h4>
                    <p className="text-sm text-muted-foreground">Automatically download enrolled course materials</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Download quality</h4>
                    <p className="text-sm text-muted-foreground">Choose video quality for downloads</p>
                  </div>
                  <Badge variant="outline">High Quality</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Storage limit</h4>
                    <p className="text-sm text-muted-foreground">Maximum storage for offline content</p>
                  </div>
                  <Badge variant="outline">10 GB</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sync when on WiFi only</h4>
                    <p className="text-sm text-muted-foreground">Prevent downloads over mobile data</p>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button className="w-full">
                  <Wifi className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfflineContent;
