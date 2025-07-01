
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Play, 
  BookOpen, 
  Users, 
  Clock, 
  Award,
  CheckCircle,
  Circle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LearningPaths = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: learningPaths = [], isLoading } = useQuery({
    queryKey: ['learning-paths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select(`
          *,
          learning_path_modules (*),
          user_learning_path_enrollments (
            *,
            user_module_progress (*)
          )
        `);
      
      if (error) throw error;
      return data || [];
    }
  });

  const transformLearningPathData = (path: any) => {
    const enrollment = path.user_learning_path_enrollments?.[0];
    const modules = path.learning_path_modules || [];
    const moduleProgress = enrollment?.user_module_progress || [];
    
    const completedModules = moduleProgress.filter((progress: any) => 
      progress.status === 'completed'
    ).length;
    
    const progress = modules.length > 0 ? (completedModules / modules.length) * 100 : 0;
    
    return {
      id: path.id,
      title: path.title,
      description: path.description,
      progress: Math.round(progress),
      totalModules: modules.length,
      completedModules,
      duration: `${path.total_duration_hours || 0} hours`,
      participants: 0, // This would need to be calculated from enrollments
      category: path.category || 'General',
      level: path.level,
      modules: modules.map((module: any) => {
        const moduleProgress = moduleProgress.find((p: any) => p.module_id === module.id);
        return {
          title: module.title,
          completed: moduleProgress?.status === 'completed'
        };
      })
    };
  };

  const transformedPaths = learningPaths.map(transformLearningPathData);
  
  const filteredPaths = transformedPaths.filter(path =>
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading learning paths...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Paths</h1>
        <p className="text-muted-foreground">Structured learning journeys to master key skills</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search learning paths..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Create Path
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredPaths.map((path) => (
          <Card key={path.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <Badge variant="outline">{path.category}</Badge>
                    <Badge variant="secondary">{path.level}</Badge>
                  </div>
                  <CardDescription>{path.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {path.participants} enrolled
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.completedModules}/{path.totalModules} modules
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{path.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{path.completedModules} of {path.totalModules} modules</span>
                </div>
                <Progress value={path.progress} className="h-2" />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Modules</h4>
                <div className="grid gap-2">
                  {path.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg border">
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={module.completed ? "text-foreground" : "text-muted-foreground"}>
                        {module.title}
                      </span>
                      {module.completed && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  {path.progress === 100 ? "Review" : "Continue"}
                </Button>
                <Button variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  {path.progress === 100 ? "Certificate" : "View Details"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPaths.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No learning paths found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;
