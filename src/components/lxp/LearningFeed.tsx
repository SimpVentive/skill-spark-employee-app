
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle, Share2, Calendar, Clock, Users, Plus, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

const LearningFeed = () => {
  const [activeTab, setActiveTab] = useState("all");

  const learningItems = [
    {
      id: 1,
      title: "2023 Compliance Training",
      type: "course",
      duration: "3 days",
      progress: 85,
      image: "/placeholder.svg",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Introduction to Onboarding",
      type: "course",
      duration: "9 days",
      progress: 0,
      image: "/placeholder.svg",
      status: "assigned"
    },
    {
      id: 3,
      title: "Introduction to Acme Product",
      type: "course",
      duration: "6 weeks",
      progress: 0,
      image: "/placeholder.svg",
      status: "assigned"
    }
  ];

  const learningNeeds = [
    {
      id: 1,
      title: "Public Speaking",
      isNew: true,
      icon: "🎤"
    },
    {
      id: 2,
      title: "Implementation Timelines",
      isNew: true,
      icon: "📊"
    },
    {
      id: 3,
      title: "Public Speaking",
      isNew: false,
      icon: "🎤"
    },
    {
      id: 4,
      title: "Implementation Timelines",
      isNew: false,
      icon: "📊"
    }
  ];

  const socialPosts = [
    {
      id: 1,
      author: "Sophia Weins...",
      company: "ACME Corporation",
      time: "7M",
      content: "The quarter is quickly coming to an end. Please try to get your trainings completed this week or as soon as possible!",
      likes: 0,
      comments: 0,
      isPinned: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Home</span>
              🏠
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search" 
                className="pl-10 w-80 bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* My Work Section */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">My work</h2>
                    <Tabs defaultValue="assigned" className="w-auto">
                      <TabsList className="bg-gray-100">
                        <TabsTrigger value="assigned" className="text-sm">Assigned</TabsTrigger>
                        <TabsTrigger value="ongoing" className="text-sm">Ongoing</TabsTrigger>
                        <TabsTrigger value="completed" className="text-sm">Completed</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <Button variant="ghost" size="sm">
                    <span className="sr-only">Menu</span>
                    ⋮
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {learningItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center text-white text-4xl">
                        📚
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{item.duration}</span>
                        </div>
                        {item.progress > 0 && (
                          <div className="space-y-1">
                            <Progress value={item.progress} className="h-2" />
                            <div className="text-xs text-gray-500">{item.progress}% complete</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Needs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Learning Needs</h2>
                  <Button variant="link" className="text-teal-600">See all</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {learningNeeds.map((need) => (
                    <Card key={need.id} className="relative hover:shadow-md transition-shadow cursor-pointer">
                      {need.isNew && (
                        <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white">
                          New
                        </Badge>
                      )}
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-2">{need.icon}</div>
                        <h3 className="font-medium text-sm">{need.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* User Profile */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">Jack Smith</h3>
                <p className="text-sm text-gray-600 mb-4">Post a message in ACME Corporation</p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </CardContent>
            </Card>

            {/* Social Feed */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-sm text-teal-600">
                  📌 Pinned post
                </div>
                {socialPosts.map((post) => (
                  <div key={post.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{post.author}</span>
                          <span className="text-teal-600">{post.company}</span>
                          <span className="text-gray-500">{post.time}</span>
                        </div>
                        <p className="text-sm mt-1">{post.content}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <Button variant="ghost" size="sm" className="h-auto p-0">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="h-auto p-0">
                            <Heart className="h-4 w-4 mr-1" />
                            Like
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <p className="text-sm">A new Learning Need has been posted in 
                      <span className="font-medium text-teal-600"> ACME Corporation</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningFeed;
