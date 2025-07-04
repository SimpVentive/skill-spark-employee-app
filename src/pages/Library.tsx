
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Search, Download, Eye } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for library resources
  const ebooks = [
    {
      id: 1,
      title: "Leadership in the Digital Age",
      author: "Dr. Sarah Johnson",
      category: "Leadership",
      description: "A comprehensive guide to modern leadership strategies",
      downloadUrl: "#",
      checkedOut: true,
      dueDate: "2025-01-15"
    },
    {
      id: 2,
      title: "Project Management Fundamentals",
      author: "Michael Chen",
      category: "Project Management",
      description: "Essential principles and practices for successful project delivery",
      downloadUrl: "#",
      checkedOut: false
    },
    {
      id: 3,
      title: "Data Analytics for Business",
      author: "Prof. Emily Davis",
      category: "Analytics",
      description: "Transform data into actionable business insights",
      downloadUrl: "#",
      checkedOut: true,
      dueDate: "2025-01-20"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Effective Communication Skills",
      duration: "45 min",
      category: "Communication",
      description: "Master the art of professional communication",
      thumbnailUrl: "#",
      watchUrl: "#"
    },
    {
      id: 2,
      title: "Agile Methodology Explained",
      duration: "30 min",
      category: "Project Management",
      description: "Understanding Agile principles and practices",
      thumbnailUrl: "#",
      watchUrl: "#"
    },
    {
      id: 3,
      title: "Financial Planning Basics",
      duration: "60 min",
      category: "Finance",
      description: "Introduction to personal and business financial planning",
      thumbnailUrl: "#",
      watchUrl: "#"
    }
  ];

  const reports = [
    {
      id: 1,
      title: "Industry Trends Report 2024",
      category: "Industry Analysis",
      description: "Comprehensive analysis of current industry trends and future predictions",
      downloadUrl: "#",
      pages: 45
    },
    {
      id: 2,
      title: "Learning & Development Best Practices",
      category: "L&D",
      description: "Research-based insights into effective learning methodologies",
      downloadUrl: "#",
      pages: 32
    },
    {
      id: 3,
      title: "Digital Transformation Guide",
      category: "Technology",
      description: "Strategic approaches to digital transformation initiatives",
      downloadUrl: "#",
      pages: 28
    }
  ];

  const filteredEbooks = ebooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground mt-1">
            Access your digital learning resources
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books, videos, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="ebooks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ebooks">E-Books</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ebooks" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEbooks.map((book) => (
                <Card key={book.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      {book.checkedOut && (
                        <Badge variant="secondary">Checked Out</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>by {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Badge variant="outline">{book.category}</Badge>
                    <p className="text-sm text-muted-foreground">{book.description}</p>
                    {book.checkedOut && book.dueDate && (
                      <p className="text-sm text-orange-600">Due: {book.dueDate}</p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        {book.checkedOut ? 'Download' : 'Check Out'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((video) => (
                <Card key={video.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Video className="h-8 w-8 text-red-600" />
                      <Badge variant="outline">{video.duration}</Badge>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                    <Button className="w-full">
                      <Video className="h-4 w-4 mr-1" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <FileText className="h-8 w-8 text-green-600" />
                      <Badge variant="outline">{report.pages} pages</Badge>
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default Library;
