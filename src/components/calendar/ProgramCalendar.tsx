
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";

interface ProgramEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  faculty: string;
  level: string;
  icon: string;
}

const ProgramCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock program events
  const programEvents: ProgramEvent[] = [
    {
      id: "1",
      title: "GXP Compliance Training",
      date: new Date(2025, 1, 1), // Feb 1, 2025
      startTime: "09:00",
      endTime: "17:00",
      venue: "Online eLearning",
      faculty: "John Smith",
      level: "Basic",
      icon: "📋"
    },
    {
      id: "2",
      title: "Advanced Leadership Development",
      date: new Date(2025, 1, 15), // Feb 15, 2025
      startTime: "09:00",
      endTime: "17:00",
      venue: "Corporate Training Center",
      faculty: "Dr. Sarah Johnson",
      level: "Advanced",
      icon: "👑"
    },
    {
      id: "3",
      title: "Project Management Certification Prep",
      date: new Date(2025, 1, 20), // Feb 20, 2025
      startTime: "10:00",
      endTime: "16:00",
      venue: "Training Room B",
      faculty: "Prof. Michael Chen",
      level: "Advanced",
      icon: "📊"
    }
  ];

  const programDates = programEvents.map(event => event.date);
  
  const selectedEvents = programEvents.filter(event => 
    selectedDate && 
    event.date.toDateString() === selectedDate.toDateString()
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Program Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              programDay: programDates
            }}
            modifiersStyles={{
              programDay: { 
                backgroundColor: '#3b82f6', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Blue highlighted dates have scheduled programs</p>
            <p>• Click on any date to view program details</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? 
              `Programs on ${selectedDate.toLocaleDateString()}` : 
              'Select a date to view programs'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{event.icon}</span>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge className={getLevelColor(event.level)}>
                          {event.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-orange-600" />
                      <span>{event.faculty}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    View Program Details
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No programs scheduled for this date</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramCalendar;
