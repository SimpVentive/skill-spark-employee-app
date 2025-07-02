
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Course Catalog', href: '/catalog', icon: BookOpen },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  if (!user) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/dashboard" className="flex items-center space-x-2 px-2 py-4">
          <h1 className="text-xl font-bold text-blue-600">SkillSpark</h1>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.href} className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
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
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/notifications'}>
                  <Link to="/notifications" className="flex items-center">
                    <Settings className="mr-3 h-5 w-5" />
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
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <nav className="bg-white shadow-sm border-b h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex justify-between items-center h-full">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-4" />
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

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
