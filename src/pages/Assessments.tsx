import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { supabase } from "@/integrations/supabase/client";

const Assessments = () => {
  const { data: assessments = [], isLoading } = useQuery({
    queryKey: ['assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assessments')
        .select(`
          *,
          programs (title),
          user_assessment_attempts (
            attempt_number,
            score,
            status,
            completed_at
          )
        `);
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading assessments...</div>;
  }

  // Transform the data to match the existing component structure
  const transformedAssessments = assessments.map(assessment => {
    const latestAttempt = assessment.user_assessment_attempts?.[0];
    
    return {
      id: assessment.id,
      title: assessment.title,
      type: assessment.assessment_type,
      course: assessment.programs?.title || 'Unknown Course',
      status: latestAttempt?.status === 'completed' ? 'Completed' : 
              latestAttempt?.status === 'failed' ? 'Failed' :
              latestAttempt?.status === 'in_progress' ? 'In Progress' : 'Pending',
      score: latestAttempt?.score || null,
      passingScore: assessment.passing_score,
      timeLimit: assessment.time_limit_minutes ? `${assessment.time_limit_minutes} minutes` : 'No limit',
      attempts: assessment.user_assessment_attempts?.length || 0,
      maxAttempts: assessment.max_attempts || 3,
      dueDate: assessment.due_date || 'No due date',
      completedDate: latestAttempt?.completed_at || null
    };
  });

  const upcomingAssessments = transformedAssessments.filter(a => a.status === "Pending" || a.status === "In Progress");
  const completedAssessments = transformedAssessments.filter(a => a.status === "Completed" || a.status === "Failed");

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

  // Calculate summary stats
  const totalAssessments = transformedAssessments.length;
  const completedCount = transformedAssessments.filter(a => a.status === "Completed").length;
  const pendingCount = transformedAssessments.filter(a => a.status === "Pending" || a.status === "In Progress").length;
  const averageScore = completedAssessments.length > 0 
    ? Math.round(completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length)
    : 0;

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
              <p className="text-2xl font-bold">{totalAssessments}</p>
              <p className="text-sm text-muted-foreground">Total Assessments</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Trophy className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{averageScore}%</p>
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
            {upcomingAssessments.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No upcoming assessments</p>
                </CardContent>
              </Card>
            ) : (
              upcomingAssessments.map((assessment) => (
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
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedAssessments.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No completed assessments</p>
                </CardContent>
              </Card>
            ) : (
              completedAssessments.map((assessment) => (
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
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {transformedAssessments.map((assessment) => (
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
