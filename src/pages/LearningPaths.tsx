
import { useState } from "react";
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

const LearningPaths = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const learningPaths = [
    {
      id: 1,
      title: "GXP Compliance Certification",
      description: "Complete certification program for Good Practice compliance",
      progress: 75,
      totalModules: 8,
      completedModules: 6,
      duration: "40 hours",
      participants: 156,
      category: "Compliance",
      level: "Intermediate",
      modules: [
        { title: "Introduction to GXP", completed: true },
        { title: "Good Manufacturing Practice", completed: true },
        { title: "Good Clinical Practice", completed: true },
        { title: "Good Laboratory Practice", completed: true },
        { title: "Quality Management", completed: true },
        { title: "Documentation Standards", completed: true },
        { title: "Risk Assessment", completed: false },
        { title: "Final Evaluation", completed: false }
      ]
    },
    {
      id: 2,
      title: "Leadership Development Program",
      description: "Comprehensive leadership skills development path",
      progress: 30,
      totalModules: 6,
      completedModules: 2,
      duration: "32 hours",
      participants: 89,
      category: "Leadership",
      level: "Advanced",
      modules: [
        { title: "Leadership Fundamentals", completed: true },
        { title: "Team Management", completed: true },
        { title: "Strategic Thinking", completed: false },
        { title: "Change Management", completed: false },
        { title: "Communication Skills", completed: false },
        { title: "Performance Management", completed: false }
      ]
    },
    {
      id: 3,
      title: "Safety Training Pathway",
      description: "Essential safety protocols and procedures training",
      progress: 100,
      totalModules: 5,
      completedModules: 5,
      duration: "24 hours",
      participants: 203,
      category: "Safety",
      level: "Beginner",
      modules: [
        { title: "Workplace Safety Basics", completed: true },
        { title: "Emergency Procedures", completed: true },
        { title: "Personal Protective Equipment", completed: true },
        { title: "Hazard Identification", completed: true },
        { title: "Safety Reporting", completed: true }
      ]
    }
  ];

  const filteredPaths = learningPaths.filter(path =>
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      </div>
    </div>
  );
};

export default LearningPaths;
