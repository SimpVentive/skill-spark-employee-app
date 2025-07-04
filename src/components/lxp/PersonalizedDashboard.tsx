
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  MessageSquare,
  Star,
  PlayCircle,
  Clock,
  Award,
  Brain,
  Lightbulb
} from "lucide-react";

const PersonalizedDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const personalizedContent = [
    {
      title: "Recommended for You",
      type: "course",
      reason: "Based on your role as Risk Manager",
      progress: 0,
      duration: "4 hours",
      rating: 4.8,
      icon: "🎯"
    },
    {
      title: "Complete Your Learning Path",
      type: "path",
      reason: "2 of 5 courses completed",
      progress: 40,
      duration: "12 hours remaining",
      rating: 4.9,
      icon: "🛤️"
    },
    {
      title: "Trending in Your Industry",
      type: "course",
      reason: "Popular among Banking professionals",
      progress: 0,
      duration: "6 hours",
      rating: 4.7,
      icon: "📈"
    }
  ];

  const skillRecommendations = [
    { skill: "Risk Analysis", level: 75, trend: "up", demand: "High" },
    { skill: "Regulatory Compliance", level: 60, trend: "up", demand: "Critical" },
    { skill: "Data Analytics", level: 45, trend: "stable", demand: "Growing" },
    { skill: "Leadership", level: 30, trend: "up", demand: "Essential" }
  ];

  const learningGoals = [
    { goal: "Complete Risk Management Certification", progress: 65, deadline: "Dec 2024" },
    { goal: "Master Data Analytics Tools", progress: 30, deadline: "Jan 2025" },
    { goal: "Improve Presentation Skills", progress: 80, deadline: "Nov 2024" }
  ];

  const peerActivity = [
    { name: "Sarah Chen", action: "completed", course: "Advanced Risk Assessment", time: "2 hours ago", avatar: "SC" },
    { name: "Mike Johnson", action: "started", course: "Compliance Fundamentals", time: "4 hours ago", avatar: "MJ" },
    { name: "Lisa Wang", action: "earned badge", course: "Data Analysis Expert", time: "1 day ago", avatar: "LW" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                RM
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Risk Manager!</h1>
              <p className="text-gray-600">Continue your learning journey • 3 new recommendations</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="skills">Skills Development</TabsTrigger>
            <TabsTrigger value="social">Social Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Learning Streak</p>
                      <p className="text-3xl font-bold">12 days</p>
                    </div>
                    <Trophy className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Skills Mastered</p>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                    <Brain className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Courses Completed</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Peer Rank</p>
                      <p className="text-3xl font-bold">#3</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.goal}</h4>
                        <Badge variant="outline">{goal.deadline}</Badge>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-sm text-gray-600">{goal.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {personalizedContent.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{item.reason}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {item.rating}
                          </span>
                        </div>
                        {item.progress > 0 && (
                          <div className="mb-4">
                            <Progress value={item.progress} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">{item.progress}% complete</p>
                          </div>
                        )}
                        <Button className="w-full">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          {item.progress > 0 ? 'Continue' : 'Start Learning'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Skills Development Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillRecommendations.map((skill, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{skill.skill}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={skill.demand === 'Critical' ? 'destructive' : 
                                          skill.demand === 'High' ? 'default' : 'secondary'}>
                              {skill.demand} Demand
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Trending {skill.trend}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{skill.level}%</p>
                          <p className="text-xs text-gray-500">Current Level</p>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-3 mb-3" />
                      <Button size="sm" variant="outline">
                        View Learning Path
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Peer Learning Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peerActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <Avatar>
                        <AvatarFallback className="bg-blue-500 text-white">
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.name}</span> {activity.action}{' '}
                          <span className="font-medium text-blue-600">{activity.course}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Learning Communities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Risk Management Forum</h4>
                    <p className="text-sm text-gray-600 mb-3">145 members • 23 active discussions</p>
                    <Button size="sm">Join Discussion</Button>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
                    <h4 className="font-medium mb-2">Banking Professionals</h4>
                    <p className="text-sm text-gray-600 mb-3">892 members • 67 active discussions</p>
                    <Button size="sm">Join Discussion</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
