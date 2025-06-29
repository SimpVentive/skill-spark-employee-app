
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgramCard from "./ProgramCard";

const PlannedPrograms = () => {
  const tnaPrograms = [
    {
      id: 1,
      title: "Advanced Leadership Development",
      level: "Advanced",
      theme: "Leadership",
      outline: "Comprehensive leadership skills development for senior managers...",
      dates: "2024-07-15 to 2024-07-19",
      venue: "Corporate Training Center, Mumbai",
      multipleBatches: true,
      faculty: "Dr. Sarah Johnson, Leadership Expert",
      preTest: "Available from 2024-07-01",
      preRead: "Leadership handbook and case studies",
      icon: "👑",
      type: "tna"
    },
    {
      id: 2,
      title: "Digital Transformation Strategy",
      level: "Intermediate",
      theme: "Technology",
      outline: "Learn to lead digital transformation initiatives in your organization...",
      dates: "2024-08-05 to 2024-08-07",
      venue: "Tech Hub, Bangalore",
      multipleBatches: false,
      faculty: "Prof. Michael Chen",
      preTest: "Available from 2024-07-20",
      preRead: "Digital strategy framework guide",
      icon: "🚀",
      type: "tna"
    }
  ];

  const mandatoryPrograms = [
    {
      id: 3,
      title: "Compliance and Ethics Training",
      level: "Basic",
      theme: "Compliance",
      outline: "Essential compliance training covering company policies and ethical practices...",
      dates: "2024-07-22 to 2024-07-22",
      venue: "Online Training Platform",
      multipleBatches: true,
      faculty: "Legal Team",
      preTest: "Available from 2024-07-15",
      preRead: "Company code of conduct",
      icon: "⚖️",
      type: "mandatory"
    }
  ];

  const selfDirectedPrograms = [
    {
      id: 4,
      title: "Data Analytics Fundamentals",
      level: "Beginner",
      theme: "Analytics",
      outline: "Introduction to data analytics tools and techniques for business insights...",
      dates: "Self-paced (Complete by 2024-09-30)",
      venue: "E-Learning Platform",
      multipleBatches: false,
      faculty: "Analytics Team",
      preTest: "Available immediately",
      preRead: "Statistics refresher materials",
      icon: "📊",
      type: "self-directed"
    }
  ];

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
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="mandatory" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mandatoryPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="self-directed" className="space-y-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selfDirectedPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PlannedPrograms;
