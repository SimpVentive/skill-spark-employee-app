
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Auth from "@/pages/Auth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import CourseCatalog from "./pages/CourseCatalog";
import LearningPaths from "./pages/LearningPaths";
import Assessments from "./pages/Assessments";
import Certifications from "./pages/Certifications";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import SocialLearning from "./pages/SocialLearning";
import Bookmarks from "./pages/Bookmarks";
import OfflineContent from "./pages/OfflineContent";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout>
            <Index />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/calendar" element={
        <ProtectedRoute>
          <AppLayout>
            <Calendar />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/catalog" element={
        <ProtectedRoute>
          <AppLayout>
            <CourseCatalog />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/learning-paths" element={
        <ProtectedRoute>
          <AppLayout>
            <LearningPaths />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/assessments" element={
        <ProtectedRoute>
          <AppLayout>
            <Assessments />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/certifications" element={
        <ProtectedRoute>
          <AppLayout>
            <Certifications />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <AppLayout>
            <Analytics />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/achievements" element={
        <ProtectedRoute>
          <AppLayout>
            <Achievements />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/social" element={
        <ProtectedRoute>
          <AppLayout>
            <SocialLearning />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/bookmarks" element={
        <ProtectedRoute>
          <AppLayout>
            <Bookmarks />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/offline" element={
        <ProtectedRoute>
          <AppLayout>
            <OfflineContent />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
