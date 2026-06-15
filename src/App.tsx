import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import Index from '@/pages/Index';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Calendar from '@/pages/Calendar';
import Achievements from '@/pages/Achievements'; 
import Analytics from '@/pages/Analytics';
import Programs from '@/pages/Programs';
import Integrations from '@/pages/Integrations';
import Library from '@/pages/Library';
import Assessments from '@/pages/Assessments';
import NotificationSettings from '@/components/notifications/NotificationSettings';
import NotFound from '@/pages/NotFound';
import LXPHub from '@/pages/LXPHub';
import CourseCatalog from '@/pages/CourseCatalog';
import LearningPaths from '@/pages/LearningPaths';
import OfflineContent from '@/pages/OfflineContent';
import Bookmarks from '@/pages/Bookmarks';
import SocialLearning from '@/pages/SocialLearning';
import Certifications from '@/pages/Certifications';
import LaserPerformance from '@/pages/LaserPerformance';
import UserGuide from '@/pages/UserGuide';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="course-catalog" element={<CourseCatalog />} />
              <Route path="learning-paths" element={<LearningPaths />} />
              <Route path="assessments" element={<Assessments />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="offline-content" element={<OfflineContent />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="social-learning" element={<SocialLearning />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="laser-performance" element={<LaserPerformance />} />
              <Route path="user-guide" element={<UserGuide />} />
              <Route path="notifications" element={
                <div className="container mx-auto px-4 py-8">
                  <NotificationSettings />
                </div>
              } />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
