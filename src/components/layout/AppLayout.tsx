
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  BarChart3, 
  Award, 
  Home,
  Search,
  Play,
  FileText,
  Download,
  Bookmark,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Search, label: "Course Catalog", href: "/catalog" },
    { icon: Play, label: "Learning Paths", href: "/paths" },
    { icon: FileText, label: "Assessments", href: "/assessments" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: Download, label: "Offline Content", href: "/offline" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: Trophy, label: "Achievements", href: "/achievements" },
    { icon: Users, label: "Social Learning", href: "/social" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Award, label: "Certifications", href: "/certifications" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="inset">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-lg">SkillSpark</h1>
                <p className="text-xs text-muted-foreground">Learning Platform</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                  >
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Welcome back!</div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
