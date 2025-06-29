
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, User, Eye, EyeOff, Mail } from "lucide-react";

const EligiblePrograms = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  const eligiblePrograms = [
    {
      id: 1,
      title: "Strategic Planning Workshop",
      level: "Advanced",
      theme: "Strategy",
      outline: "Comprehensive workshop on strategic planning methodologies and implementation frameworks for senior executives...",
      venue: "Executive Training Center, Delhi",
      faculty: "Dr. Rajesh Kumar, Strategy Consultant",
      icon: "🎯",
      date: new Date(2024, 6, 20) // July 20, 2024
    },
    {
      id: 2,
      title: "Innovation Management",
      level: "Intermediate",
      theme: "Innovation",
      outline: "Learn to foster innovation culture and manage innovation processes in your organization...",
      venue: "Innovation Hub, Pune",
      faculty: "Prof. Anita Sharma",
      icon: "💡",
      date: new Date(2024, 6, 25) // July 25, 2024
    },
    {
      id: 3,
      title: "Financial Management for Non-Finance Managers",
      level: "Basic",
      theme: "Finance",
      outline: "Essential financial concepts and tools for managers without financial background...",
      venue: "Finance Academy, Hyderabad",
      faculty: "CA Priya Nair",
      icon: "💰",
      date: new Date(2024, 7, 5) // August 5, 2024
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basic': return 'bg-corporate-green text-corporate-green';
      case 'Intermediate': return 'bg-corporate-blue text-corporate-blue';
      case 'Advanced': return 'bg-corporate-orange text-corporate-orange';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestNomination = (programTitle: string) => {
    console.log(`Requesting nomination for ${programTitle} - triggering email to superior`);
    // Here you would trigger email to superior
  };

  const toggleOutline = (programId: number) => {
    setExpandedProgram(expandedProgram === programId ? null : programId);
  };

  // Filter programs based on selected date (for demo, showing programs within 30 days of selected date)
  const filteredPrograms = eligiblePrograms.filter(program => {
    if (!selectedDate) return true;
    const timeDiff = Math.abs(program.date.getTime() - selectedDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 30;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Program Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              Select a date to view programs around that time
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programs List */}
      <div className="lg:col-span-2 space-y-4">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{program.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getLevelColor(program.level)}>
                        {program.level}
                      </Badge>
                      {program.theme && (
                        <Badge variant="outline" className="text-xs">
                          {program.theme}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-muted-foreground">
                    {expandedProgram === program.id 
                      ? program.outline 
                      : `${program.outline.substring(0, 100)}...`
                    }
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOutline(program.id)}
                    className="ml-2 p-1 h-auto"
                  >
                    {expandedProgram === program.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-corporate-green" />
                  <span className="font-medium">Venue:</span>
                  <span className="text-muted-foreground">{program.venue}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-corporate-orange" />
                  <span className="font-medium">Faculty:</span>
                  <span className="text-muted-foreground">{program.faculty}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button 
                  onClick={() => handleRequestNomination(program.title)}
                  className="min-w-[140px]"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Request Nomination
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPrograms.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No eligible programs found for the selected date range.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EligiblePrograms;
