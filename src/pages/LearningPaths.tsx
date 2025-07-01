
import { useState, useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";

interface LearningPath {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string;
  total_duration_hours: number | null;
  modules: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  progress: number;
  totalModules: number;
  completedModules: number;
  participants: number;
}

const LearningPaths = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: learningPaths = [], isLoading } = useQuery({
    queryKey: ['learning-paths'],
    queryFn: async () => {
      console.log('Fetching learning paths...');
      
      // Fetch learning paths with their modules
      const { data: paths, error: pathsError } = await supabase
        .from('learning_paths')
        .select(`
          *,
          learning_path_modules (
            id,
            title,
            order_index
          )
        `)
        .order('created_at', { ascending: false });

      if (pathsError) {
        console.error('Error fetching learning paths:', pathsError);
        throw pathsError;
      }

      console.log('Raw learning paths data:', paths);

      // For now, we'll use mock progress data since we don't have user authentication
      // In a real app, you'd fetch user-specific progress data
      const pathsWithProgress: LearningPath[] = (paths || []).map((path, index) => {
        const modules = (path.learning_path_modules || [])
          .sort((a, b) => a.order_index - b.order_index)
          .map((module, moduleIndex) => ({
            id: module.id,
            title: module.title,
            completed: moduleIndex < Math.floor(Math.random() * 3) + 1 // Mock completion status
          }));

        const completedModules = modules.filter(m => m.completed).length;
        const totalModules = modules.length || 5; // Default to 5 if no modules
        const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

        return {
          id: path.id,
          title: path.title,
          description: path.description || 'No description available',
          category: path.category || 'General',
          level: path.level,
          total_duration_hours: path.total_duration_hours,
          modules,
          progress,
          totalModules,
          completedModules,
          participants: Math.floor(Math.random() * 2000) + 500 // Mock participants count
        };
      });

      console.log('Processed learning paths:', pathsWithProgress);
      return pathsWithProgress;
    }
  });

  const filteredPaths = learningPaths.filter(path =>
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (path.description && path.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (path.category && path.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Learning Paths</h1>
          <p className="text-muted-foreground">Loading structured learning journeys...</p>
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
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
                      {path.total_duration_hours ? `${path.total_duration_hours} hours` : 'Duration TBD'}
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
                  {path.modules.length > 0 ? path.modules.map((module, index) => (
                    <div key={module.id} className="flex items-center gap-3 p-2 rounded-lg border">
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
                  )) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No modules available yet
                    </div>
                  )}
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
        
        {filteredPaths.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No learning paths found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPaths;
