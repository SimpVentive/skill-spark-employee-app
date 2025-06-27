
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Trophy,
  Play,
  Calendar,
  Target
} from "lucide-react";

const Assessments = () => {
  const assessments = [
    {
      id: 1,
      title: "GXP Compliance Final Test",
      type: "E-Learning Test",
      course: "GXP Compliance Certification",
      status: "Completed",
      score: 92,
      passingScore: 80,
      timeLimit: "60 minutes",
      attempts: 1,
      maxAttempts: 3,
      dueDate: "2025-06-15",
      completedDate: "2025-06-10"
    },
    {
      id: 2,
      title: "Leadership Assessment",
      type: "Skills Evaluation",
      course: "Leadership Development",
      status: "In Progress",
      score: null,
      passingScore: 75,
      timeLimit: "45 minutes",
      attempts: 0,
      maxAttempts: 2,
      dueDate: "2025-06-20",
      completedDate: null
    },
    {
      id: 3,
      title: "Safety Knowledge Check",
      type: "Quiz",
      course: "Safety Training Pathway",
      status: "Pending",
      score: null,
      passingScore: 70,
      timeLimit: "30 minutes",
      attempts: 0,
      maxAttempts: 3,
      dueDate: "2025-06-25",
      completedDate: null
    },
    {
      id: 4,
      title: "Project Management Practical",
      type: "Practical Assessment",
      course: "Project Management Basics",
      status: "Failed",
      score: 65,
      passingScore: 70,
      timeLimit: "90 minutes",
      attempts: 2,
      maxAttempts: 3,
      dueDate: "2025-06-18",
      completedDate: "2025-06-17"
    }
  ];

  const upcomingAssessments = assessments.filter(a => a.status === "Pending" || a.status === "In Progress");
  const completedAssessments = assessments.filter(a => a.status === "Completed" || a.status === "Failed");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "Failed":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assessments</h1>
        <p className="text-muted-foreground">Track your progress and test your knowledge</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Target className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Total Assessments</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Trophy className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingAssessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(assessment.status)}
                        <div>
                          <h4 className="font-semibold">{assessment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assessment.course}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {assessment.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assessment.timeLimit}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {assessment.dueDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Attempts: {assessment.attempts}/{assessment.maxAttempts}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Passing Score: {assessment.passingScore}%
                        </span>
                      </div>
                    </div>
                    
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      {assessment.status === "In Progress" ? "Continue" : "Start"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedAssessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(assessment.status)}
                        <div>
                          <h4 className="font-semibold">{assessment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assessment.course}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {assessment.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Completed: {assessment.completedDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                        {assessment.score && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Score:</span>
                            <span className={`text-sm font-bold ${
                              assessment.score >= assessment.passingScore ? "text-green-600" : "text-red-600"
                            }`}>
                              {assessment.score}%
                            </span>
                          </div>
                        )}
                        <span className="text-sm text-muted-foreground">
                          Attempts: {assessment.attempts}/{assessment.maxAttempts}
                        </span>
                      </div>

                      {assessment.score && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Performance</span>
                            <span>{assessment.score}% (Passing: {assessment.passingScore}%)</span>
                          </div>
                          <Progress 
                            value={(assessment.score / 100) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                      {assessment.status === "Failed" && assessment.attempts < assessment.maxAttempts && (
                        <Button size="sm">
                          Retake
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(assessment.status)}
                        <div>
                          <h4 className="font-semibold">{assessment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assessment.course}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {assessment.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assessment.timeLimit}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {assessment.dueDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                        {assessment.score && (
                          <span className={`text-sm font-bold ${
                            assessment.score >= assessment.passingScore ? "text-green-600" : "text-red-600"
                          }`}>
                            Score: {assessment.score}%
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          Attempts: {assessment.attempts}/{assessment.maxAttempts}
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      View Details
                    </Button>
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

export default Assessments;
