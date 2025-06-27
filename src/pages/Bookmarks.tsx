
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bookmark, 
  Search, 
  Play, 
  BookOpen, 
  Video, 
  FileText,
  Star,
  Calendar,
  Trash2,
  Filter
} from "lucide-react";

const Bookmarks = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const bookmarks = [
    {
      id: 1,
      title: "GXP Compliance Module 3: Good Clinical Practice",
      type: "video",
      course: "GXP Compliance Certification",
      duration: "45 minutes",
      progress: 60,
      bookmarkedAt: "2025-06-20",
      category: "Compliance",
      rating: 4.8,
      notes: "Important section on clinical trial protocols"
    },
    {
      id: 2,
      title: "Leadership Communication Strategies",
      type: "document",
      course: "Leadership Development Program",
      duration: "20 minutes read",
      progress: 100,
      bookmarkedAt: "2025-06-18",
      category: "Leadership",
      rating: 4.6,
      notes: "Great examples of effective communication"
    },
    {
      id: 3,
      title: "Safety Incident Reporting Process",
      type: "course",
      course: "Safety Training Pathway",
      duration: "30 minutes",
      progress: 0,
      bookmarkedAt: "2025-06-15",
      category: "Safety",
      rating: 4.9,
      notes: "Need to review before assessment"
    },
    {
      id: 4,
      title: "Project Risk Assessment Template",
      type: "resource",
      course: "Project Management Basics",
      duration: "N/A",
      progress: null,
      bookmarkedAt: "2025-06-12",
      category: "Management",
      rating: 4.7,
      notes: "Useful template for future projects"
    },
    {
      id: 5,
      title: "Quality Management Systems Overview",
      type: "video",
      course: "GXP Compliance Certification",
      duration: "35 minutes",
      progress: 25,
      bookmarkedAt: "2025-06-10",
      category: "Compliance",
      rating: 4.5,
      notes: "Complex topic, need to revisit"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-blue-600" />;
      case "document":
        return <FileText className="h-5 w-5 text-green-600" />;
      case "course":
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentBookmarks = bookmarks.slice(0, 3);
  const categories = [...new Set(bookmarks.map(b => b.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <p className="text-muted-foreground">Access your saved learning materials and resources</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Bookmark className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{bookmarks.length}</p>
              <p className="text-sm text-muted-foreground">Total Bookmarks</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Star className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">4.7</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{categories.length}</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Bookmarks</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="notes">With Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredBookmarks.map((bookmark) => (
              <Card key={bookmark.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getTypeIcon(bookmark.type)}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="font-semibold">{bookmark.title}</h4>
                        <p className="text-sm text-muted-foreground">{bookmark.course}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Duration: {bookmark.duration}</span>
                        <span>Bookmarked: {bookmark.bookmarkedAt}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{bookmark.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{bookmark.category}</Badge>
                        <Badge variant="secondary" className="capitalize">{bookmark.type}</Badge>
                      </div>

                      {bookmark.notes && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{bookmark.notes}</p>
                        </div>
                      )}

                      {bookmark.progress !== null && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{bookmark.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${bookmark.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        {bookmark.progress === 100 ? "Review" : "Continue"}
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

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {recentBookmarks.map((bookmark) => (
              <Card key={bookmark.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getTypeIcon(bookmark.type)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold">{bookmark.title}</h4>
                        <p className="text-sm text-muted-foreground">{bookmark.course}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{bookmark.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {bookmark.bookmarkedAt}
                        </span>
                      </div>
                    </div>
                    
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {categories.map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
                <CardDescription>
                  {bookmarks.filter(b => b.category === category).length} bookmarks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookmarks
                  .filter(bookmark => bookmark.category === category)
                  .map((bookmark) => (
                    <div key={bookmark.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(bookmark.type)}
                        <div>
                          <h5 className="font-medium">{bookmark.title}</h5>
                          <p className="text-sm text-muted-foreground">{bookmark.course}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div className="grid gap-4">
            {bookmarks
              .filter(bookmark => bookmark.notes)
              .map((bookmark) => (
                <Card key={bookmark.id}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getTypeIcon(bookmark.type)}
                          <div>
                            <h4 className="font-semibold">{bookmark.title}</h4>
                            <p className="text-sm text-muted-foreground">{bookmark.course}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{bookmark.category}</Badge>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">{bookmark.notes}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Bookmarked: {bookmark.bookmarkedAt}
                        </span>
                        <Button variant="outline" size="sm">
                          Edit Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookmarks;
