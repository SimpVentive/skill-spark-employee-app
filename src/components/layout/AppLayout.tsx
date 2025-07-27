
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
  Plug
} from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Course Catalog', href: '/course-catalog', icon: Search },
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
];

const AppLayout = () => {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  console.log('AppLayout: Rendering with state', { 
    hasUser: !!user, 
    email: user?.email, 
    loading, 
    pathname: location.pathname 
  });

  const handleSignOut = async () => {
    await signOut();
  };

  // Show loading skeleton while auth is initializing
  if (loading) {
    console.log('AppLayout: Showing loading state');
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Loading Sidebar */}
        <div className="w-64 bg-blue-700 shadow-lg">
          <div className="p-4 border-b">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-4 space-y-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        
        {/* Loading Main Content */}
        <div className="flex-1">
          <div className="h-16 bg-white border-b flex items-center px-6">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="p-6">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // If no user after loading, redirect to auth
  if (!user) {
    console.log('AppLayout: No user found, should redirect to auth');
    window.location.href = '/auth';
    return null;
  }

  console.log('AppLayout: Rendering authenticated layout');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-blue-700 shadow-lg transition-all duration-300 flex-shrink-0`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-600 flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/dashboard" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white">SkillSpark</h1>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-white hover:bg-blue-600"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white font-medium' 
                      : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          {/* Settings Section */}
          <div className="mt-8 pt-4 border-t border-blue-600">
            <Link
              to="/notifications"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === '/notifications'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-blue-100 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <Bell className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>Notifications</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-16 flex-shrink-0 px-6">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-900">
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
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
