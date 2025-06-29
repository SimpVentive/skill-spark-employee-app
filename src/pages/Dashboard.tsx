
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp,
  Play,
  Award,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: BookOpen, label: "Courses Enrolled", value: "12", color: "text-blue-600" },
    { icon: Trophy, label: "Achievements", value: "24", color: "text-yellow-600" },
    { icon: Clock, label: "Hours Learned", value: "156", color: "text-green-600" },
    { icon: Target, label: "Skills Mastered", value: "8", color: "text-purple-600" },
  ];

  const recentCourses = [
    { id: 1, title: "React Development Fundamentals", progress: 75, type: "Development", lastAccessed: "2 hours ago" },
    { id: 2, title: "Digital Marketing Strategy", progress: 45, type: "Marketing", lastAccessed: "1 day ago" },
    { id: 3, title: "Project Management Basics", progress: 90, type: "Management", lastAccessed: "3 days ago" },
  ];

  const currentPrograms = [
    { id: 1, title: "Advanced Leadership Development", progress: 30, type: "TNA Based", nextSession: "Tomorrow 10:00 AM" },
    { id: 2, title: "Compliance and Ethics Training", progress: 100, type: "Mandatory", nextSession: "Completed" },
  ];

  const achievements = [
    { id: 1, title: "First Course Completed", icon: "🎯", earned: true },
    { id: 2, title: "Week Streak", icon: "🔥", earned: true },
    { id: 3, title: "Social Learner", icon: "👥", earned: false },
    { id: 4, title: "Assessment Master", icon: "📝", earned: true },
  ];

  const handleContinueLearning = () => {
    navigate('/catalog');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Learning Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div className="ml-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current E-Learning Courses */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">E-Learning Courses</h4>
              {recentCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{course.type}</Badge>
                        <span>•</span>
                        <span>{course.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground">
                    {course.progress}% complete
                  </div>
                </div>
              ))}
            </div>

            {/* Current Training Programs */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground">Training Programs</h4>
              {currentPrograms.map((program) => (
                <div key={program.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{program.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{program.type}</Badge>
                        <span>•</span>
                        <span>{program.nextSession}</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={program.progress} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground">
                    {program.progress}% complete
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4" onClick={handleContinueLearning}>
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.earned ? 'bg-muted/50' : 'opacity-50'
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.earned ? 'Earned' : 'In Progress'}
                  </p>
                </div>
                {achievement.earned && (
                  <Trophy className="h-5 w-5 text-yellow-600" />
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <Trophy className="h-4 w-4 mr-2" />
              View All Achievements
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Learning Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Learning Streak
          </CardTitle>
          <CardDescription>Keep up the momentum!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">7 Days</p>
              <p className="text-sm text-muted-foreground">Current streak</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => (
              <div 
                key={i} 
                className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-xs font-medium"
              >
                ✓
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
