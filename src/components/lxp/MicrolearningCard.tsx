
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, Star, BookOpen } from "lucide-react";

interface MicrolearningCardProps {
  title: string;
  description: string;
  duration: string;
  progress?: number;
  rating: number;
  category: string;
  thumbnail: string;
  isCompleted?: boolean;
}

const MicrolearningCard = ({
  title,
  description,
  duration,
  progress = 0,
  rating,
  category,
  thumbnail,
  isCompleted = false
}: MicrolearningCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
          {thumbnail}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="h-12 w-12 text-white" />
        </div>
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            ✓
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>{rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
          <BookOpen className="h-4 w-4 ml-2" />
          <span>Microlearning</span>
        </div>
        
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <Button className="w-full" variant={isCompleted ? "outline" : "default"}>
          {isCompleted ? "Review" : progress > 0 ? "Continue" : "Start Learning"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MicrolearningCard;
