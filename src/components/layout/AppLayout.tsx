
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
  Bell
} from 'lucide-react';

const AppLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Course Catalog', href: '/catalog', icon: BookOpen },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Achievements', href: '/achievements', icon: Trophy },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">SkillSpark</h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <Link to="/notifications">
                    <Button variant="ghost" size="sm">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </Link>
                  <span className="text-sm text-gray-700">
                    Welcome, {user.email}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        {user && (
          <div className="w-64 bg-white shadow-sm min-h-screen">
            <nav className="mt-8">
              <div className="px-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 px-4">
                <Link
                  to="/notifications"
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === '/notifications'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Notifications
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
