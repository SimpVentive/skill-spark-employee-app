
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlannedPrograms from "@/components/programs/PlannedPrograms";
import EligiblePrograms from "@/components/programs/EligiblePrograms";

const Programs = () => {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Courses & Programs</h1>
        <p className="text-muted-foreground mt-1">
          Manage your training programs and explore available courses
        </p>
      </div>

      <Tabs defaultValue="planned" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="planned">Planned Programs</TabsTrigger>
          <TabsTrigger value="eligible">Eligible Programs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planned" className="mt-6">
          <PlannedPrograms />
        </TabsContent>
        
        <TabsContent value="eligible" className="mt-6">
          <EligiblePrograms />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Programs;
