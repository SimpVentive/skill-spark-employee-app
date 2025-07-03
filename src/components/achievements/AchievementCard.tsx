
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, BookOpen } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'completion' | 'streak' | 'milestone' | 'excellence';
  earnedDate: string;
  icon: string;
  points?: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'completion': return 'bg-green-100 text-green-800';
      case 'streak': return 'bg-blue-100 text-blue-800';
      case 'milestone': return 'bg-purple-100 text-purple-800';
      case 'excellence': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'completion': return <BookOpen className="h-4 w-4" />;
      case 'streak': return <Target className="h-4 w-4" />;
      case 'milestone': return <Star className="h-4 w-4" />;
      case 'excellence': return <Trophy className="h-4 w-4" />;
      default: return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{achievement.title}</h3>
              <Badge className={getTypeColor(achievement.type)}>
                {getTypeIcon(achievement.type)}
                <span className="ml-1 capitalize">{achievement.type}</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Earned: {new Date(achievement.earnedDate).toLocaleDateString()}</span>
              {achievement.points && <span>{achievement.points} points</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
