
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Trophy, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  Menu,
  Search,
  Route,
  FileText,
  Download,
  Bookmark,
  Users,
  Award,
  Plug,
  Zap,
  HelpCircle,
  Globe
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'LASER Performance', href: '/laser-performance', icon: Zap },
  { name: 'Course Catalog', href: '/course-catalog', icon: Search },
  { name: 'MOOC Courses', href: '/mooc-courses', icon: Globe },
  { name: 'Learning Paths', href: '/learning-paths', icon: Route },
  { name: 'Assessments', href: '/assessments', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Offline Content', href: '/offline-content', icon: Download },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Social Learning', href: '/social-learning', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Certifications', href: '/certifications', icon: Award },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'User Guide', href: '/user-guide', icon: HelpCircle },
];

function AppSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SkillSpark</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/notifications'}>
                  <Link to="/notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AppLayout = () => {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  console.log('AppLayout: Rendering with state', { 
    hasUser: !!user, 
    email: user?.email, 
    loading, 
    pathname: location.pathname 
  });


  // Show loading skeleton while auth is initializing
  if (loading) {
    console.log('AppLayout: Showing loading state');
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <div className="w-64 bg-sidebar shadow-lg">
            <div className="p-4 border-b">
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="p-4 space-y-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="h-16 bg-background border-b flex items-center px-6">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="p-6">
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // If no user after loading, redirect to auth
  if (!user) {
    console.log('AppLayout: No user found, should redirect to auth');
    window.location.href = '/auth';
    return null;
  }

  console.log('AppLayout: Rendering authenticated layout');

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-background border-b h-16 flex-shrink-0 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold">
                Welcome back, {user.email}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/notifications">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
