import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  Play,
  BookOpen,
  Code,
  Briefcase,
  Palette,
  TrendingUp
} from "lucide-react";

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "development", name: "Development", icon: Code, count: 45 },
    { id: "business", name: "Business", icon: Briefcase, count: 32 },
    { id: "design", name: "Design", icon: Palette, count: 28 },
    { id: "marketing", name: "Marketing", icon: TrendingUp, count: 19 },
  ];

  const courses = [
    {
      id: 1,
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts with hands-on projects",
      instructor: "Sarah Johnson",
      duration: "24 hours",
      students: 15420,
      rating: 4.8,
      level: "Intermediate",
      category: "Development",
      price: "Free",
      thumbnail: "🚀",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      description: "Learn the essentials of digital marketing and grow your online presence",
      instructor: "Mike Chen",
      duration: "18 hours",
      students: 8930,
      rating: 4.6,
      level: "Beginner",
      category: "Marketing",
      price: "$49",
      thumbnail: "📱",
      tags: ["SEO", "Social Media", "Analytics"]
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Create beautiful and user-friendly interfaces with design thinking",
      instructor: "Emma Davis",
      duration: "32 hours",
      students: 12100,
      rating: 4.9,
      level: "Beginner",
      category: "Design",
      price: "$79",
      thumbnail: "🎨",
      tags: ["Figma", "Prototyping", "User Research"]
    },
    {
      id: 4,
      title: "Project Management Mastery",
      description: "Learn agile methodologies and become an effective project manager",
      instructor: "David Wilson",
      duration: "20 hours",
      students: 6750,
      rating: 4.7,
      level: "Intermediate",
      category: "Business",
      price: "$39",
      thumbnail: "📊",
      tags: ["Agile", "Scrum", "Leadership"]
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <p className="text-muted-foreground">Discover new skills and advance your career</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, skills, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center p-4">
              <category.icon className="h-8 w-8 text-primary mr-3" />
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} courses</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="free">Free</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="text-4xl mb-2">{course.thumbnail}</div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.instructor}</span>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-lg">{course.price}</span>
                    <Button className="ml-auto">
                      <Play className="h-4 w-4 mr-2" />
                      {course.price === "Free" ? "Start Learning" : "Enroll Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Trending courses coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">New courses coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="free">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.filter(course => course.price === "Free").map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="text-4xl mb-2">{course.thumbnail}</div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.instructor}</span>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-lg">{course.price}</span>
                    <Button className="ml-auto">
                      <Play className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
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

export default CourseCatalog;
