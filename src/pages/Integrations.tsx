
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SSOConfig from '@/components/sso/SSOConfig';
import BadgeIntegration from '@/components/badges/BadgeIntegration';
import VideoPlayer from '@/components/media/VideoPlayer';
import MotivationalMessaging from '@/components/notifications/MotivationalMessaging';
import { Shield, Award, Play, MessageSquare } from 'lucide-react';

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
          <TabsList className="grid w-full grid-cols-4">
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
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default Integrations;
