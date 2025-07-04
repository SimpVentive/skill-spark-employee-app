
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillsMap from "@/components/lxp/SkillsMap";
import LearningFeed from "@/components/lxp/LearningFeed";
import PersonalizedDashboard from "@/components/lxp/PersonalizedDashboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const LXPHub = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="dashboard">My Learning</TabsTrigger>
                <TabsTrigger value="feed">Learning Feed</TabsTrigger>
                <TabsTrigger value="skills">Skills Map</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="dashboard" className="mt-0">
            <PersonalizedDashboard />
          </TabsContent>
          
          <TabsContent value="feed" className="mt-0">
            <LearningFeed />
          </TabsContent>
          
          <TabsContent value="skills" className="mt-0">
            <SkillsMap />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default LXPHub;
