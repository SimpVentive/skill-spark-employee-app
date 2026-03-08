import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, BookOpen, Target, Award, Calendar, Users, Activity, Play, Trophy, Zap, Settings, ExternalLink, CheckCircle, Users2, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import FeatureIntro from "@/components/shared/FeatureIntro";

const Analytics = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, courses: 1 },
    { day: 'Tue', hours: 3.2, courses: 2 },
    { day: 'Wed', hours: 1.8, courses: 1 },
    { day: 'Thu', hours: 4.1, courses: 3 },
    { day: 'Fri', hours: 2.9, courses: 2 },
    { day: 'Sat', hours: 5.2, courses: 4 },
    { day: 'Sun', hours: 3.6, courses: 2 }
  ];

  const monthlyProgress = [
    { month: 'Jan', completed: 3, started: 5 },
    { month: 'Feb', completed: 5, started: 7 },
    { month: 'Mar', completed: 8, started: 10 },
    { month: 'Apr', completed: 12, started: 15 },
    { month: 'May', completed: 15, started: 18 },
    { month: 'Jun', completed: 18, started: 22 }
  ];

  const categoryData = [
    { name: 'Development', value: 35, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#ef4444' },
    { name: 'Business', value: 20, color: '#10b981' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#8b5cf6' }
  ];

  const skillsProgress = [
    { skill: 'JavaScript', level: 85, change: '+5%' },
    { skill: 'React', level: 78, change: '+8%' },
    { skill: 'Node.js', level: 65, change: '+12%' },
    { skill: 'Python', level: 72, change: '+3%' },
    { skill: 'UI/UX Design', level: 58, change: '+15%' }
  ];

  const achievements = [
    { title: 'Course Completion', current: 18, target: 25, percentage: 72 },
    { title: 'Study Hours', current: 127, target: 150, percentage: 85 },
    { title: 'Skill Assessments', current: 12, target: 15, percentage: 80 },
    { title: 'Certifications', current: 3, target: 5, percentage: 60 }
  ];

  const continueLearning = [
    {
      title: "React Development Fundamentals",
      category: "Development",
      progress: 75,
      timeAgo: "2 hours ago",
      type: "E-Learning Course"
    },
    {
      title: "Digital Marketing Strategy",
      category: "Marketing", 
      progress: 45,
      timeAgo: "1 day ago",
      type: "E-Learning Course"
    },
    {
      title: "Project Management Basics",
      category: "Management",
      progress: 90,
      timeAgo: "3 days ago",
      type: "Training Program"
    },
    {
      title: "Advanced Leadership Development",
      category: "TNA Based",
      progress: 30,
      timeAgo: "Tomorrow 10:00 AM",
      type: "Training Program",
      isUpcoming: true
    },
    {
      title: "Compliance and Ethics Training",
      category: "Compliance",
      progress: 30,
      timeAgo: "Tomorrow 2:00 PM", 
      type: "Training Program",
      isUpcoming: true
    }
  ];

  const recentAchievements = [
    {
      title: "First Course Completed",
      status: "Earned",
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "Week Streak", 
      status: "Earned",
      icon: Zap,
      color: "text-orange-600"
    },
    {
      title: "Social Learner",
      status: "In Progress",
      icon: Users2,
      color: "text-blue-600"
    },
    {
      title: "Assessment Master",
      status: "Earned", 
      icon: Target,
      color: "text-purple-600"
    }
  ];

  const integrationStats = [
    {
      name: "Google Analytics",
      status: "Connected",
      lastSync: "2 minutes ago",
      icon: Activity,
      color: "text-green-600"
    },
    {
      name: "Zapier Automation",
      status: "Active",
      lastSync: "5 minutes ago", 
      icon: Zap,
      color: "text-orange-600"
    },
    {
      name: "SCORM Packages",
      status: "3 Active",
      lastSync: "1 hour ago",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      name: "Calendar Sync",
      status: "Synced",
      lastSync: "30 minutes ago",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <FeatureIntro
        icon={BarChart3}
        title="Analytics"
        subtitle="Your Learning Metrics"
        description="Analytics gives you a detailed view of your learning journey — how much time you've spent, how many courses you've completed, your assessment scores, and skill development trends. Use it to understand where you're progressing and where you might need to focus more."
        benefits={[
          "Track total time spent on learning per week and month",
          "Monitor course completion rates and streaks",
          "View assessment score trends and improvement",
          "See skill category breakdown and focus areas",
        ]}
        tips={[
          "Review your analytics weekly to spot learning patterns",
          "Compare your monthly progress to see growth trends",
          "Use skill breakdowns to identify gaps in your development",
        ]}
        color="bg-indigo-500/10 text-indigo-600"
      />

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Courses Enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
            <Clock className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Hours Learned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
            <Target className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Skills Mastered</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                <CardTitle>Continue Learning</CardTitle>
              </div>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground">E-Learning Courses</div>
                {continueLearning.filter(item => item.type === "E-Learning Course").map((course, index) => (
                  <div key={index} className="space-y-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{course.category}</Badge>
                          <span>•</span>
                          <span>{course.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{course.progress}% complete</div>
                        </div>
                        <Button size="sm" onClick={() => toast.success(`Resuming "${course.title}"...`)}>
                          <Play className="w-3 h-3 mr-1" />
                          Continue
                        </Button>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="space-y-4 mt-6">
                <div className="text-sm font-medium text-muted-foreground">Training Programs</div>
                {continueLearning.filter(item => item.type === "Training Program").map((program, index) => (
                  <div key={index} className="space-y-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{program.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{program.category}</Badge>
                          <span>•</span>
                          <span>{program.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{program.progress}% complete</div>
                        </div>
                        <Button size="sm" onClick={() => toast.success(`Resuming "${program.title}"...`)}>
                          <Play className="w-3 h-3 mr-1" />
                          Continue
                        </Button>
                      </div>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements Section */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <CardTitle>Recent Achievements</CardTitle>
              </div>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted ${achievement.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.status}</div>
                    </div>
                    {achievement.status === "Earned" && (
                      <Trophy className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                );
              })}
              <Button variant="outline" className="w-full mt-4" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics & Integrations Tabs */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Learning Activity</CardTitle>
                <CardDescription>Your daily study hours this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Categories</CardTitle>
                <CardDescription>Distribution of your learning topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Monitor your connected learning tools and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrationStats.map((integration, index) => {
                  const IconComponent = integration.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                      <div className={`p-2 rounded-lg bg-muted ${integration.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">Last sync: {integration.lastSync}</div>
                      </div>
                      <Badge variant={integration.status.includes("Connected") || integration.status.includes("Active") || integration.status.includes("Synced") ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Integrations
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Integration Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Trend</CardTitle>
              <CardDescription>Course completion over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="started" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development</CardTitle>
              <CardDescription>Your current skill levels and recent improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillsProgress.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-700">
                          {skill.change}
                        </Badge>
                        <span className="text-sm font-medium">{skill.level}%</span>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>
                    {achievement.current} of {achievement.target} completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={achievement.percentage} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>{achievement.percentage}% complete</span>
                    <span>{achievement.target - achievement.current} remaining</span>
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

export default Analytics;
