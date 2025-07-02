import { useState } from "react";
import {
  Menu,
  GraduationCap,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Book,
  ListChecks,
  Award,
  BarChart,
  Users,
  Bookmark,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const menuItems: MenuItem[] = [
  { title: "Overview", href: "/", icon: LayoutDashboard },
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Calendar", href: "/calendar", icon: CalendarIcon },
  { title: "Course Catalog", href: "/catalog", icon: Book },
  { title: "Learning Paths", href: "/learning-paths", icon: Book },
  { title: "Assessments", href: "/assessments", icon: ListChecks },
  { title: "Certifications", href: "/certifications", icon: Award },
  { title: "Analytics", href: "/analytics", icon: BarChart },
  { title: "Achievements", href: "/achievements", icon: Award },
  { title: "Social Learning", href: "/social", icon: Users },
  { title: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { title: "Offline Content", href: "/offline", icon: Download },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white border-r transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16"
        )}>
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-14 items-center border-b px-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-4 w-4" />
                </div>
                {isSidebarOpen && (
                  <span className="font-semibold">SkillSpark</span>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActiveRoute(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.title}</span>}
                </button>
              ))}
            </nav>

            {/* User Menu */}
            {isSidebarOpen && (
              <div className="border-t p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                        {user?.email?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-medium">{user?.user_metadata?.full_name || 'User'}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}>
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </header>

          {/* Page Content */}
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
