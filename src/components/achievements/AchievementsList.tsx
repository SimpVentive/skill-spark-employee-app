
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AchievementCard from "./AchievementCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";

const AchievementsList = () => {
  // For now, using mock data since user_badges table exists but might not have data
  const mockAchievements = [
    {
      id: "1",
      title: "First Course Complete",
      description: "Completed your first training program successfully",
      type: "completion" as const,
      earnedDate: "2024-12-15",
      icon: "🏆",
      points: 100
    },
    {
      id: "2", 
      title: "Learning Streak",
      description: "Completed courses for 7 consecutive days",
      type: "streak" as const,
      earnedDate: "2024-12-20",
      icon: "🔥",
      points: 150
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Enrolled in 5 different program categories",
      type: "milestone" as const,
      earnedDate: "2024-12-25",
      icon: "📚",
      points: 200
    }
  ];

  const totalPoints = mockAchievements.reduce((sum, achievement) => sum + (achievement.points || 0), 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAchievements.length}</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">Achievement points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Achievement</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">Knowledge Seeker</div>
            <p className="text-xs text-muted-foreground">Dec 25, 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsList;
