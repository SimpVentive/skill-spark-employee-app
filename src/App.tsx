
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
              <Route path="programs" element={<Programs />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="library" element={<Library />} />
              <Route path="assessments" element={<Assessments />} />
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
