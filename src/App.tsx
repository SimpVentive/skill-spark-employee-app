
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CourseCatalog from "./pages/CourseCatalog";
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
            <Route path="/paths" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Learning Paths</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/assessments" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Assessments</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/offline" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Offline Content</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/bookmarks" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Bookmarks</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/achievements" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Achievements</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/social" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Social Learning</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/analytics" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Analytics</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            <Route path="/certifications" element={<div className="text-center py-8"><h2 className="text-2xl font-bold">Certifications</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
