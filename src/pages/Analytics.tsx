
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, BookOpen, Target, Award, Calendar, Users, Activity } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your progress and identify learning patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127.5</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +5% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
