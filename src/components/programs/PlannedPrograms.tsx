
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import ProgramCard from "./ProgramCard";

const PlannedPrograms = () => {
  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['planned-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          program_sessions (*)
        `)
        .in('program_type', ['tna', 'mandatory', 'self-directed']);
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading programs...</div>;
  }

  const tnaPrograms = programs.filter(p => p.program_type === 'tna');
  const mandatoryPrograms = programs.filter(p => p.program_type === 'mandatory');
  const selfDirectedPrograms = programs.filter(p => p.program_type === 'self-directed');

  const transformProgramData = (program: any) => {
    const session = program.program_sessions?.[0];
    return {
      id: program.id,
      title: program.title,
      level: program.level,
      theme: program.theme,
      outline: program.outline,
      dates: session 
        ? `${session.start_date} to ${session.end_date}`
        : 'Self-paced',
      venue: program.venue,
      multipleBatches: program.multiple_batches,
      faculty: program.faculty,
      preTest: program.pre_test_info,
      preRead: program.pre_read_info,
      icon: program.icon,
      type: program.program_type
    };
  };

  return (
    <Tabs defaultValue="tna" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tna">TNA Based Programs</TabsTrigger>
        <TabsTrigger value="mandatory">Mandatory Programs</TabsTrigger>
        <TabsTrigger value="self-directed">Self Directed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tna" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tnaPrograms.map((program) => (
            <ProgramCard key={program.id} program={transformProgramData(program)} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="mandatory" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mandatoryPrograms.map((program) => (
            <ProgramCard key={program.id} program={transformProgramData(program)} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="self-directed" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selfDirectedPrograms.map((program) => (
            <ProgramCard key={program.id} program={transformProgramData(program)} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PlannedPrograms;
