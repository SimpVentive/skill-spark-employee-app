
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SSOConfig from '@/components/sso/SSOConfig';
import BadgeIntegration from '@/components/badges/BadgeIntegration';
import VideoPlayer from '@/components/media/VideoPlayer';
import MotivationalMessaging from '@/components/notifications/MotivationalMessaging';
import CalendarSync from '@/components/calendar/CalendarSync';
import CommunicationIntegration from '@/components/communication/CommunicationIntegration';
import CollaborativeLearning from '@/components/collaboration/CollaborativeLearning';
import GoogleAnalytics from '@/components/integrations/GoogleAnalytics';
import OpenAIIntegration from '@/components/integrations/OpenAIIntegration';
import LinkedInLearning from '@/components/integrations/LinkedInLearning';
import { 
  Shield, 
  Award, 
  Play, 
  MessageSquare, 
  Calendar,
  Bell,
  Users,
  BarChart3,
  Bot,
  Linkedin
} from 'lucide-react';

const Integrations = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Platform Integrations</h1>
          <p className="text-lg text-muted-foreground">
            Connect external services to enhance your learning platform
          </p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI</span>
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger value="sso" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">SSO</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Media</span>
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Comms</span>
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Collab</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6">
              <GoogleAnalytics />
              <div className="grid md:grid-cols-2 gap-6">
                {/* Placeholder for Mixpanel */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Mixpanel Integration</h3>
                  <p className="text-gray-600">Advanced event tracking and user analytics</p>
                  <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
                </div>
                {/* Placeholder for xAPI */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">xAPI/TinCan Integration</h3>
                  <p className="text-gray-600">Standardized learning activity data</p>
                  <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <div className="grid gap-6">
              <OpenAIIntegration />
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Amazon Personalize</h3>
                <p className="text-gray-600">AI-powered course recommendations based on user behavior</p>
                <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="linkedin" className="mt-6">
            <div className="grid gap-6">
              <LinkedInLearning />
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Coursera API</h3>
                <p className="text-gray-600">Sync external certifications and course completions</p>
                <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sso" className="mt-6">
            <SSOConfig />
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <BadgeIntegration />
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <VideoPlayer />
          </TabsContent>

          <TabsContent value="messaging" className="mt-6">
            <MotivationalMessaging />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <CalendarSync />
          </TabsContent>

          <TabsContent value="communication" className="mt-6">
            <CommunicationIntegration />
          </TabsContent>

          <TabsContent value="collaboration" className="mt-6">
            <CollaborativeLearning />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default Integrations;
