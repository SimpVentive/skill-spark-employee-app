
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
import SCORMIntegration from '@/components/elearning/SCORMIntegration';
import XAPIIntegration from '@/components/elearning/XAPIIntegration';
import CMI5Integration from '@/components/elearning/CMI5Integration';
import H5PIntegration from '@/components/elearning/H5PIntegration';
import VideoAPIIntegration from '@/components/elearning/VideoAPIIntegration';
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
  Linkedin,
  BookOpen,
  Activity,
  Puzzle,
  Youtube
} from 'lucide-react';

const Integrations = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Platform Integrations</h1>
          <p className="text-lg text-muted-foreground">
            Connect external services and e-learning standards to enhance your learning platform
          </p>
        </div>

        <Tabs defaultValue="scorm" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-15">
            <TabsTrigger value="scorm" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">SCORM</span>
            </TabsTrigger>
            <TabsTrigger value="xapi" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">xAPI</span>
            </TabsTrigger>
            <TabsTrigger value="cmi5" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">cmi5</span>
            </TabsTrigger>
            <TabsTrigger value="h5p" className="flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              <span className="hidden sm:inline">H5P</span>
            </TabsTrigger>
            <TabsTrigger value="video-api" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              <span className="hidden sm:inline">Video APIs</span>
            </TabsTrigger>
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

          <TabsContent value="scorm" className="mt-6">
            <SCORMIntegration />
          </TabsContent>

          <TabsContent value="xapi" className="mt-6">
            <XAPIIntegration />
          </TabsContent>

          <TabsContent value="cmi5" className="mt-6">
            <CMI5Integration />
          </TabsContent>

          <TabsContent value="h5p" className="mt-6">
            <H5PIntegration />
          </TabsContent>

          <TabsContent value="video-api" className="mt-6">
            <VideoAPIIntegration />
          </TabsContent>

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
                {/* Enhanced xAPI Analytics */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Learning Analytics Dashboard</h3>
                  <p className="text-gray-600">Comprehensive learning data visualization from xAPI statements</p>
                  <p className="text-sm text-gray-500 mt-2">Integrated with xAPI tab above</p>
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
