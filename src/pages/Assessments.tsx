
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, Trophy, TrendingUp, PlayCircle } from "lucide-react";
import FeatureIntro from "@/components/shared/FeatureIntro";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Assessments = () => {
  // Fetch user's assessment attempts
  const { data: assessmentAttempts = [] } = useQuery({
    queryKey: ['user-assessment-attempts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_assessment_attempts')
        .select(`
          *,
          assessments (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Mock data for comprehensive assessment overview
  const assessmentStats = {
    totalCompleted: 8,
    averageScore: 85,
    pendingAssessments: 3,
    improvementRate: 12
  };

  const programWiseAssessments = [
    {
      programId: "1",
      programTitle: "GXP Compliance Training",
      programIcon: "📋",
      entryTest: { score: 78, status: "completed", date: "2024-12-01" },
      exitTest: { score: 92, status: "completed", date: "2024-12-15" },
      averageScore: 85,
      participantCount: 25
    },
    {
      programId: "2",
      programTitle: "Leadership Development",
      programIcon: "👑",
      entryTest: { score: 82, status: "completed", date: "2024-11-15" },
      exitTest: { score: 88, status: "completed", date: "2024-12-10" },
      averageScore: 81,
      participantCount: 18
    },
    {
      programId: "3",
      programTitle: "Project Management Fundamentals",
      programIcon: "📊",
      entryTest: { score: 75, status: "completed", date: "2024-11-01" },
      exitTest: { score: null, status: "pending", date: null },
      averageScore: 79,
      participantCount: 22
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    if (score >= 70) return "outline";
    return "destructive";
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground mt-1">
            Track your assessment performance and progress
          </p>
        </div>

        {/* Assessment Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessmentStats.totalCompleted}</div>
              <p className="text-xs text-muted-foreground">Total assessments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessmentStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessmentStats.pendingAssessments}</div>
              <p className="text-xs text-muted-foreground">Awaiting completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{assessmentStats.improvementRate}%</div>
              <p className="text-xs text-muted-foreground">Score improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Program-wise Assessments */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Program-wise Assessment Performance</h2>
          <div className="space-y-4">
            {programWiseAssessments.map((program) => (
              <Card key={program.programId}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{program.programIcon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{program.programTitle}</CardTitle>
                      <CardDescription>
                        {program.participantCount} participants • Average: {program.averageScore}%
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Entry Test */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Entry Test</h4>
                        {program.entryTest.status === "completed" && (
                          <Badge variant={getScoreBadgeVariant(program.entryTest.score)}>
                            {program.entryTest.score}%
                          </Badge>
                        )}
                      </div>
                      {program.entryTest.status === "completed" ? (
                        <div className="space-y-1">
                          <Progress value={program.entryTest.score} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            Completed on {program.entryTest.date}
                          </p>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          <PlayCircle className="h-4 w-4 mr-1" />
                          Start Test
                        </Button>
                      )}
                    </div>

                    {/* Exit Test */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Exit Test</h4>
                        {program.exitTest.status === "completed" && program.exitTest.score && (
                          <Badge variant={getScoreBadgeVariant(program.exitTest.score)}>
                            {program.exitTest.score}%
                          </Badge>
                        )}
                      </div>
                      {program.exitTest.status === "completed" && program.exitTest.score ? (
                        <div className="space-y-1">
                          <Progress value={program.exitTest.score} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            Completed on {program.exitTest.date}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Badge variant="outline">Pending</Badge>
                          <p className="text-xs text-muted-foreground">
                            Available after program completion
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Improvement Indicator */}
                  {program.entryTest.status === "completed" && 
                   program.exitTest.status === "completed" && 
                   program.exitTest.score && (
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        Improvement: +{program.exitTest.score - program.entryTest.score} points
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Assessment Attempts */}
        {assessmentAttempts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Assessment Attempts</h2>
            <div className="space-y-3">
              {assessmentAttempts.slice(0, 5).map((attempt) => (
                <Card key={attempt.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{attempt.assessments?.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Attempt #{attempt.attempt_number} • {new Date(attempt.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {attempt.score && (
                        <Badge variant={getScoreBadgeVariant(attempt.score)}>
                          {attempt.score}%
                        </Badge>
                      )}
                      <Badge variant={attempt.status === 'completed' ? 'default' : 'secondary'}>
                        {attempt.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Assessments;
