
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CourseCatalog from "./pages/CourseCatalog";
import Calendar from "./pages/Calendar";
import LearningPaths from "./pages/LearningPaths";
import Assessments from "./pages/Assessments";
import OfflineContent from "./pages/OfflineContent";
import Bookmarks from "./pages/Bookmarks";
import Achievements from "./pages/Achievements";
import SocialLearning from "./pages/SocialLearning";
import Analytics from "./pages/Analytics";
import Certifications from "./pages/Certifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalog" element={<CourseCatalog />} />
            <Route path="/paths" element={<LearningPaths />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/offline" element={<OfflineContent />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/social" element={<SocialLearning />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/certifications" element={<Certifications />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
