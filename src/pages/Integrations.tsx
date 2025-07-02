
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SSOConfig from '@/components/sso/SSOConfig';
import BadgeIntegration from '@/components/badges/BadgeIntegration';
import VideoPlayer from '@/components/media/VideoPlayer';
import MotivationalMessaging from '@/components/notifications/MotivationalMessaging';
import CalendarSync from '@/components/calendar/CalendarSync';
import CommunicationIntegration from '@/components/communication/CommunicationIntegration';
import CollaborativeLearning from '@/components/collaboration/CollaborativeLearning';
import { 
  Shield, 
  Award, 
  Play, 
  MessageSquare, 
  Calendar,
  Bell,
  Users
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

        <Tabs defaultValue="sso" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="sso" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              SSO & Auth
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="messaging" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messaging
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Collaboration
            </TabsTrigger>
          </TabsList>

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
