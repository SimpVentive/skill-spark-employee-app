
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Star, Target, Medal, Zap, BookOpen, Calendar } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Course Completion Champion",
      description: "Complete 10 courses",
      icon: Trophy,
      progress: 7,
      total: 10,
      unlocked: false,
      points: 500,
      category: "Learning"
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete a course in under 2 hours",
      icon: Zap,
      progress: 1,
      total: 1,
      unlocked: true,
      points: 200,
      category: "Speed"
    },
    {
      id: 3,
      title: "Assessment Master",
      description: "Score 90% or higher on 5 assessments",
      icon: Target,
      progress: 3,
      total: 5,
      unlocked: false,
      points: 300,
      category: "Performance"
    },
    {
      id: 4,
      title: "Learning Streak",
      description: "Study for 7 consecutive days",
      icon: Calendar,
      progress: 7,
      total: 7,
      unlocked: true,
      points: 350,
      category: "Consistency"
    },
    {
      id: 5,
      title: "Knowledge Seeker",
      description: "Complete courses from 3 different categories",
      icon: BookOpen,
      progress: 2,
      total: 3,
      unlocked: false,
      points: 400,
      category: "Diversity"
    },
    {
      id: 6,
      title: "Social Butterfly",
      description: "Participate in 10 discussion forums",
      icon: Star,
      progress: 6,
      total: 10,
      unlocked: false,
      points: 250,
      category: "Social"
    }
  ];

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const totalAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">Track your learning milestones and unlock rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Medal className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">Points earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
            <Trophy className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAchievements}/{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Achievements earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {Math.floor(totalPoints / 200) + 1}</div>
            <p className="text-xs text-muted-foreground">Learning level</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          const progressPercentage = (achievement.progress / achievement.total) * 100;
          
          return (
            <Card key={achievement.id} className={`relative ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200' : 'opacity-75'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <IconComponent className={`h-8 w-8 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                  <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                    {achievement.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.total}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-yellow-600">
                      {achievement.points} points
                    </span>
                    {achievement.unlocked && (
                      <Badge className="bg-green-100 text-green-800">
                        Unlocked!
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
