
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Users, Eye, Target, BookOpen } from "lucide-react";

const SkillsMap = () => {
  const [selectedRole, setSelectedRole] = useState("Risk Manager");

  const trendingSkills = [
    { name: "Risk Assessment & Analysis", percentage: 20, level: "high" },
    { name: "Regulatory Compliance - BFSI", percentage: 18, level: "high" },
    { name: "Stakeholder Management", percentage: 12, level: "medium" },
    { name: "Problem Solving", percentage: 10, level: "medium" }
  ];

  const roleSkills = [
    "Risk, Compliance, Legal",
    "Operations", 
    "Data Analytics"
  ];

  const criticalityData = [
    { skill: "Risk Assessment & Analysis", level: "HIGH", progress: 85 },
    { skill: "Regulatory Compliance - BFSI", level: "HIGH", progress: 75 },
    { skill: "Stakeholder Management", level: "MEDIUM", progress: 60 }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="text-white text-sm">Industry: Retail Banking</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Skills & Role */}
          <div className="space-y-6">
            {/* Trending Skills */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-xs">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getLevelColor(skill.level)}`}
                        style={{ width: `${skill.percentage * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Role Profile */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-purple-400">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <div className="bg-white text-black rounded-full px-4 py-2 inline-block">
                  {selectedRole}
                </div>
                <div className="mt-4 space-y-2">
                  {roleSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Criticality Chart */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Criticality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {criticalityData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.skill}</span>
                      <Badge variant={item.level === 'HIGH' ? 'destructive' : 'secondary'}>
                        {item.level}
                      </Badge>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center & Right Columns - Feature Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills Organization */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create a skills-based organization.</h3>
              </CardContent>
            </Card>

            {/* Skills Normalization */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplify and normalize skills and roles.</h3>
              </CardContent>
            </Card>

            {/* Market Intelligence */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gather market intelligence on trending skills.</h3>
              </CardContent>
            </Card>

            {/* Critical Skills Alignment */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Identify critical skills aligned to your business strategy.</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMap;
