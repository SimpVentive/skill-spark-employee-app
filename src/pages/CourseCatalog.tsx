
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlannedPrograms from "@/components/programs/PlannedPrograms";
import EligiblePrograms from "@/components/programs/EligiblePrograms";
import ExternalTools from "@/components/catalog/ExternalTools";

const CourseCatalog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Catalog</h1>
        <p className="text-muted-foreground">
          Explore available training programs and external learning tools
        </p>
      </div>

      <Tabs defaultValue="planned" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="planned">Planned Programs</TabsTrigger>
          <TabsTrigger value="eligible">Available Programs</TabsTrigger>
          <TabsTrigger value="external">External Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planned" className="mt-6">
          <PlannedPrograms />
        </TabsContent>
        
        <TabsContent value="eligible" className="mt-6">
          <EligiblePrograms />
        </TabsContent>
        
        <TabsContent value="external" className="mt-6">
          <ExternalTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseCatalog;
