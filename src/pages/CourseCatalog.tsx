
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, MapPin, User, Clock, FileText, Eye, EyeOff } from "lucide-react";
import PlannedPrograms from "@/components/programs/PlannedPrograms";
import EligiblePrograms from "@/components/programs/EligiblePrograms";

const CourseCatalog = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Courses / Programs</h1>
        <p className="text-muted-foreground">Manage your training programs and development opportunities</p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="planned" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="planned">Planned Programs</TabsTrigger>
          <TabsTrigger value="eligible">Eligible Programs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planned" className="space-y-6 mt-6">
          <PlannedPrograms />
        </TabsContent>
        
        <TabsContent value="eligible" className="space-y-6 mt-6">
          <EligiblePrograms />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseCatalog;
