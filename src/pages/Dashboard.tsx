
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
  Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch user's learning progress
  const { data: learningProgress = [] } = useQuery({
    queryKey: ['learning-progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_learning_progress')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

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

  // Calculate total learning hours
  const totalHours = learningProgress.reduce((sum, progress) => sum + (progress.hours_completed || 0), 0);
  const iltHours = learningProgress.find(p => p.activity_type === 'ilt')?.hours_completed || 0;
  const elearningHours = learningProgress.find(p => p.activity_type === 'elearning')?.hours_completed || 0;
  const peerToPeerHours = learningProgress.find(p => p.activity_type === 'peer-to-peer')?.hours_completed || 0;

  const handleLearningHoursClick = () => {
    navigate('/analytics');
  };

  const handleCoursesEnrolledClick = () => {
    navigate('/programs');
  };

  const handleAchievementsClick = () => {
    navigate('/achievements');
  };

  const handleContinueLearningClick = () => {
    navigate('/programs');
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your learning overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleCoursesEnrolledClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledPrograms.length}</div>
            <p className="text-xs text-muted-foreground">
              Active enrollments
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleLearningHoursClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours of Learning</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Total hours completed
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleAchievementsClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Badges earned
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Overall completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Hours Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Learning Hours Breakdown
          </CardTitle>
          <CardDescription>Your learning time across different activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium">ILT Hours</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{iltHours.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-green-600" />
                <span className="font-medium">E-Learning</span>
              </div>
              <span className="text-lg font-bold text-green-600">{elearningHours.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Peer-to-Peer</span>
              </div>
              <span className="text-lg font-bold text-orange-600">{peerToPeerHours.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning */}
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
                    <Button size="sm" onClick={handleContinueLearningClick}>
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleContinueLearningClick}
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
              <Button onClick={handleContinueLearningClick}>
                Explore Programs
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">GXP Compliance Training</h4>
                  <p className="text-sm text-muted-foreground">Feb 01, 2025</p>
                </div>
                <Badge>Confirmed</Badge>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/calendar')}
              >
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <h4 className="font-medium">First Course Complete</h4>
                  <p className="text-sm text-muted-foreground">Completed your first training</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAchievementsClick}
              >
                View All Achievements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
