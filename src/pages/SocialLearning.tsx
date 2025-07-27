
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, MessageCircle, ThumbsUp, Share, Search, TrendingUp, Clock, Eye } from "lucide-react";

const SocialLearning = () => {
  const discussions = [
    {
      id: 1,
      title: "Best practices for React Hooks",
      author: "Sarah Chen",
      avatar: "/placeholder.svg",
      category: "Development",
      replies: 23,
      likes: 45,
      views: 234,
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: 2,
      title: "Machine Learning fundamentals - Where to start?",
      author: "Mike Johnson",
      avatar: "/placeholder.svg",
      category: "AI/ML",
      replies: 18,
      likes: 32,
      views: 187,
      timeAgo: "4 hours ago",
      trending: false
    },
    {
      id: 3,
      title: "Project Management certification tips",
      author: "Emma Wilson",
      avatar: "/placeholder.svg",
      category: "Management",
      replies: 15,
      likes: 28,
      views: 156,
      timeAgo: "6 hours ago",
      trending: true
    },
    {
      id: 4,
      title: "Cloud architecture patterns discussion",
      author: "David Lee",
      avatar: "/placeholder.svg",
      category: "Cloud",
      replies: 31,
      likes: 52,
      views: 298,
      timeAgo: "1 day ago",
      trending: false
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "JavaScript Mastery",
      description: "Learn advanced JavaScript concepts together",
      members: 45,
      activity: "Very Active",
      category: "Development",
      nextSession: "Tomorrow 3:00 PM"
    },
    {
      id: 2,
      name: "Data Science Beginners",
      description: "Starting your data science journey",
      members: 32,
      activity: "Active",
      category: "Data Science",
      nextSession: "Friday 6:00 PM"
    },
    {
      id: 3,
      name: "UX Design Workshop",
      description: "Collaborative UX design learning",
      members: 28,
      activity: "Moderate",
      category: "Design",
      nextSession: "Next Week"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Rodriguez", points: 2450, avatar: "/placeholder.svg" },
    { rank: 2, name: "Lisa Wang", points: 2320, avatar: "/placeholder.svg" },
    { rank: 3, name: "Tom Brown", points: 2180, avatar: "/placeholder.svg" },
    { rank: 4, name: "Anna Davis", points: 2050, avatar: "/placeholder.svg" },
    { rank: 5, name: "John Smith", points: 1920, avatar: "/placeholder.svg" }
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Social Learning</h1>
        <p className="text-muted-foreground">Connect, collaborate, and learn together</p>
      </div>

      <Tabs defaultValue="discussions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10" />
            </div>
            <Button>Start Discussion</Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={discussion.avatar} />
                        <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{discussion.title}</CardTitle>
                          {discussion.trending && (
                            <Badge className="bg-red-100 text-red-800">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <Badge variant="outline">{discussion.category}</Badge>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{discussion.views} views</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search study groups..." className="pl-10" />
            </div>
            <Button>Create Group</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{group.category}</Badge>
                    <Badge className={
                      group.activity === "Very Active" ? "bg-green-100 text-green-800" :
                      group.activity === "Active" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {group.activity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Next session:</span> {group.nextSession}
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Learners This Month
              </CardTitle>
              <CardDescription>Rankings based on learning points and community contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        user.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        #{user.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{user.points}</div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default SocialLearning;
