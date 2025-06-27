
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "GXP Compliance Training",
      type: "Training",
      startDate: "2025-06-03",
      endDate: "2025-06-07",
      status: "Confirmed",
      participants: 24,
      location: "Online eLearning",
      category: "Compliance"
    },
    {
      id: 2,
      title: "Leadership Development Workshop",
      type: "Workshop",
      startDate: "2025-06-10",
      endDate: "2025-06-12",
      status: "Scheduled",
      participants: 15,
      location: "Training Room A",
      category: "Leadership"
    },
    {
      id: 3,
      title: "Safety Training Session",
      type: "Training",
      startDate: "2025-06-15",
      endDate: "2025-06-15",
      status: "Open",
      participants: 8,
      location: "Online eLearning",
      category: "Safety"
    }
  ];

  const upcomingEvents = [
    { date: "June 3-7", title: "GXP Compliance", status: "confirmed" },
    { date: "June 10-12", title: "Leadership Workshop", status: "scheduled" },
    { date: "June 15", title: "Safety Training", status: "open" },
    { date: "June 20", title: "Project Management", status: "planned" }
  ];

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">View and manage your training schedule</p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Monthly Calendar</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 h-20 border rounded-lg ${
                      day ? "hover:bg-muted cursor-pointer" : ""
                    }`}
                  >
                    {day && (
                      <>
                        <div className="font-medium">{day}</div>
                        {(day >= 3 && day <= 7) && (
                          <div className="text-xs bg-yellow-100 text-yellow-800 rounded px-1 mt-1">
                            GXP Training
                          </div>
                        )}
                        {(day >= 10 && day <= 12) && (
                          <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 mt-1">
                            Leadership
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Training Events</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
          
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge variant={event.status === "Confirmed" ? "default" : "outline"}>
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.startDate} - {event.endDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.participants} participants
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Upcoming Schedule</CardTitle>
              <CardDescription>Your enrolled training sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant={event.status === "confirmed" ? "default" : "outline"}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calendar;
