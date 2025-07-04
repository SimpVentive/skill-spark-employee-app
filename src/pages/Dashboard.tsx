import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Play,
  GraduationCap,
  Target,
  Users,
  FileText,
  Brain,
  Lightbulb,
  Library,
  UserCheck,
  DollarSign,
  MessageSquare
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch user's enrolled programs
  const { data: enrolledPrograms = [] } = useQuery({
    queryKey: ['enrolled-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_program_enrollments')
        .select(`
          *,
          programs (*),
          program_sessions (*)
        `)
        .in('status', ['enrolled', 'in-progress']);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Mock data for various metrics
  const dashboardStats = {
    trainingHours: { total: 45.5, classroom: 20.0, virtual: 15.5, elearning: 10.0 },
    assessments: { completed: 8, pending: 3, average: 85 },
    learningIndex: 78,
    applicationIndex: 82,
    libraryUsage: { books: 12, videos: 25, reports: 8 },
    mentorMaps: 3,
    learningROI: "85%",
    p2pLearning: { groups: 4, forums: 6 }
  };

  const handleTrainingHoursClick = () => {
    navigate('/analytics', { state: { section: 'training-hours' } });
  };

  const handleAssessmentsClick = () => {
    navigate('/assessments');
  };

  const handleLearningIndexClick = () => {
    navigate('/analytics', { state: { section: 'learning-index' } });
  };

  const handleApplicationIndexClick = () => {
    navigate('/analytics', { state: { section: 'application-index' } });
  };

  const handleLibraryUsageClick = () => {
    navigate('/library');
  };

  const handleMentorMapsClick = () => {
    navigate('/analytics', { state: { section: 'mentor-maps' } });
  };

  const handleLearningROIClick = () => {
    navigate('/analytics', { state: { section: 'learning-roi' } });
  };

  const handleP2PLearningClick = () => {
    navigate('/social-learning');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleProgramsClick = () => {
    navigate('/programs');
  };

  const handleAchievementsClick = () => {
    navigate('/achievements');
  };

  const handleLXPHubClick = () => {
    navigate('/lxp');
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your comprehensive learning overview.
        </p>
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Training Hours */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleTrainingHoursClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Hours</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.trainingHours.total}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.trainingHours.classroom}h Classroom, {dashboardStats.trainingHours.virtual}h Virtual, {dashboardStats.trainingHours.elearning}h E-Learning
            </p>
          </CardContent>
        </Card>

        {/* Assessments */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleAssessmentsClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <FileText className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.assessments.completed}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.assessments.pending} pending, {dashboardStats.assessments.average}% avg score
            </p>
          </CardContent>
        </Card>

        {/* Learning Index */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleLearningIndexClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Index</CardTitle>
            <Brain className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.learningIndex}</div>
            <p className="text-xs text-muted-foreground">
              Learning effectiveness score
            </p>
          </CardContent>
        </Card>

        {/* Learning Application Index */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleApplicationIndexClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Application Index</CardTitle>
            <Lightbulb className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.applicationIndex}</div>
            <p className="text-xs text-muted-foreground">
              Project & assignment ratings
            </p>
          </CardContent>
        </Card>

        {/* Library Usage */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleLibraryUsageClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Library Usage</CardTitle>
            <Library className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.libraryUsage.books}</div>
            <p className="text-xs text-muted-foreground">
              E-Books, {dashboardStats.libraryUsage.videos} videos, {dashboardStats.libraryUsage.reports} reports
            </p>
          </CardContent>
        </Card>

        {/* Mentor Maps */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleMentorMapsClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentor Maps</CardTitle>
            <UserCheck className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.mentorMaps}</div>
            <p className="text-xs text-muted-foreground">
              Active mentor relationships
            </p>
          </CardContent>
        </Card>

        {/* Learning ROI */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleLearningROIClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning ROI</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.learningROI}</div>
            <p className="text-xs text-muted-foreground">
              Return on investment
            </p>
          </CardContent>
        </Card>

        {/* P2P Learning */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleP2PLearningClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P2P Learning</CardTitle>
            <MessageSquare className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.p2pLearning.groups}</div>
            <p className="text-xs text-muted-foreground">
              Groups, {dashboardStats.p2pLearning.forums} forums active
            </p>
          </CardContent>
        </Card>

        {/* LXP Hub Access */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-purple-500 to-pink-500 text-white"
          onClick={handleLXPHubClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LXP Hub</CardTitle>
            <Brain className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">New!</div>
            <p className="text-xs text-purple-100">
              AI-powered personalized learning experience
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Training Calendar */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleCalendarClick}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Training Calendar
            </CardTitle>
            <CardDescription>
              View TNI, mandatory, and nomination programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              View Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Programs */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleProgramsClick}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Programs
            </CardTitle>
            <CardDescription>
              Browse available training programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              View Programs
            </Button>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleAchievementsClick}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>
              Track your learning milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              View Achievements
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Continue Learning
          </CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {enrolledPrograms.length > 0 ? (
            <>
              {enrolledPrograms.slice(0, 3).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{enrollment.programs?.icon || '📚'}</div>
                    <div>
                      <h4 className="font-medium">{enrollment.programs?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {enrollment.programs?.level} • {enrollment.programs?.theme}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={enrollment.status === 'in-progress' ? 'default' : 'secondary'}>
                      {enrollment.status}
                    </Badge>
                    <Button size="sm" onClick={handleProgramsClick}>
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleProgramsClick}
              >
                View All Programs
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No active courses</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start your learning journey by exploring available programs
              </p>
              <Button onClick={handleProgramsClick}>
                Explore Programs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
