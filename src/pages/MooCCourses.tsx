import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import FeatureIntro from '@/components/shared/FeatureIntro';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Globe, Star, Clock, Users, BookOpen, ExternalLink, GraduationCap, Filter, Search } from 'lucide-react';

interface MooCCourse {
  id: string;
  title: string;
  description: string | null;
  provider_name: string | null;
  category: string | null;
  level: string | null;
  duration_weeks: number | null;
  rating: number | null;
  student_count: number | null;
  price: number | null;
  currency: string | null;
  image_url: string | null;
  course_url: string | null;
  skills_covered: string[] | null;
  instructor: string | null;
}

const MooCCourses = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');

  const { data: courses = [], isLoading, refetch } = useQuery({
    queryKey: ['mooc-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mooc_courses')
        .select('*')
        .eq('is_active', true)
        .eq('in_catalog', true)
        .order('rating', { ascending: false });
      if (error) throw error;
      return (data || []) as MooCCourse[];
    },
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ['mooc-enrollments', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mooc_enrollments')
        .select('course_id, status, progress_percentage')
        .eq('user_id', user!.id);
      if (error) throw error;
      return data || [];
    },
  });

  const isEnrolled = (courseId: string) => {
    return enrollments.some(e => e.course_id === courseId);
  };

  const getEnrollmentStatus = (courseId: string) => {
    const e = enrollments.find(en => en.course_id === courseId);
    return e?.status || null;
  };

  const handleEnroll = async (course: MooCCourse) => {
    if (!user) return;
    try {
      const { error } = await supabase.from('mooc_enrollments').insert({
        user_id: user.id,
        course_id: course.id,
        provider_id: course.provider_name || 'unknown',
        status: 'enrolled',
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0,
      });
      if (error) throw error;
      toast.success(`Enrolled in "${course.title}"`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to enroll');
    }
  };

  const categories = Array.from(new Set(courses.map(c => c.category).filter(Boolean)));
  const providers = Array.from(new Set(courses.map(c => c.provider_name).filter(Boolean)));
  const levels = Array.from(new Set(courses.map(c => c.level).filter(Boolean)));

  const filteredCourses = courses.filter(course => {
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.skills_covered || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesProvider = providerFilter === 'all' || course.provider_name === providerFilter;
    return matchesSearch && matchesCategory && matchesLevel && matchesProvider;
  });

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8 space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <Skeleton className="h-40 w-full" />
                <CardContent className="space-y-3 pt-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <FeatureIntro
          icon={Globe}
          title="MOOC Courses"
          subtitle="External Online Courses"
          description="MOOC (Massive Open Online Course) courses are high-quality training programs from top providers like Coursera, LinkedIn Learning, and edX. Your organisation has curated these for your professional development — browse, filter, and enrol directly from here."
          benefits={[
            "Access world-class courses from leading universities and companies",
            "Earn recognised certificates to boost your career",
            "Learn at your own pace with flexible schedules",
            "Track your progress and completion within SkillsForge",
          ]}
          tips={[
            "Check with your manager about course reimbursement policies",
            "Start with beginner-level courses if you're exploring a new topic",
            "Add courses to your Learning Path for structured development",
          ]}
          color="bg-blue-500/10 text-blue-600"
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c!}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[160px]">
              <GraduationCap className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map(l => <SelectItem key={l} value={l!}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-[180px]">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              {providers.map(p => <SelectItem key={p} value={p!}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                {course.image_url ? (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={course.image_url} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {course.provider_name}
                    </Badge>
                    {course.level && (
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  {course.category && (
                    <CardDescription>{course.category}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description || 'No description available.'}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {course.duration_weeks && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration_weeks} weeks
                      </span>
                    )}
                    {course.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {course.rating}
                      </span>
                    )}
                    {course.student_count && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.student_count.toLocaleString()} students
                      </span>
                    )}
                  </div>
                  {course.skills_covered && course.skills_covered.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {course.skills_covered.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0 flex items-center justify-between">
                  <div className="text-sm font-semibold">
                    {course.price ? `${course.currency || '$'}${course.price}` : 'Free'}
                  </div>
                  <div className="flex gap-2">
                    {course.course_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={course.course_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Preview
                        </a>
                      </Button>
                    )}
                    {isEnrolled(course.id) ? (
                      <Button size="sm" disabled variant="secondary">
                        {getEnrollmentStatus(course.id) === 'completed' ? 'Completed' : 'Enrolled'}
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleEnroll(course)}>
                        Enrol Now
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MooCCourses;
