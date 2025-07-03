
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarSyncSettings from "@/components/calendar/CalendarSyncSettings";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const isMobile = useIsMobile();

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
    <div className="space-y-4 p-2 sm:p-4 lg:p-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground text-sm sm:text-base">View and manage your training schedule</p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger value="calendar" className={isMobile ? "text-xs px-2" : ""}>
            {isMobile ? "Calendar" : "Monthly Calendar"}
          </TabsTrigger>
          <TabsTrigger value="events" className={isMobile ? "text-xs px-2" : ""}>
            {isMobile ? "Events" : "Upcoming Events"}
          </TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger value="schedule">My Schedule</TabsTrigger>
              <TabsTrigger value="sync">
                <Settings className="h-4 w-4 mr-1" />
                Calendar Sync
              </TabsTrigger>
            </>
          )}
          {isMobile && (
            <TabsTrigger value="more" className="text-xs px-2">More</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className={isMobile ? "text-base" : ""}>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                </CardTitle>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button 
                    variant="outline" 
                    size={isMobile ? "sm" : "sm"} 
                    onClick={() => navigateMonth(-1)}
                    className={isMobile ? "h-8 w-8 p-0" : ""}
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size={isMobile ? "sm" : "sm"} 
                    onClick={() => navigateMonth(1)}
                    className={isMobile ? "h-8 w-8 p-0" : ""}
                  >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-1 sm:p-2 text-center font-medium text-muted-foreground text-xs sm:text-sm">
                    {isMobile ? day.charAt(0) : day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {getDaysInMonth().map((day, index) => (
                  <div
                    key={index}
                    className={`
                      ${isMobile ? "p-1 h-12 sm:h-16" : "p-2 h-20"} 
                      border rounded-lg 
                      ${day ? "hover:bg-muted cursor-pointer" : ""}
                      ${isMobile ? "text-xs" : ""}
                    `}
                  >
                    {day && (
                      <>
                        <div className="font-medium text-xs sm:text-sm">{day}</div>
                        {(day >= 3 && day <= 7) && (
                          <div className={`
                            text-xs bg-yellow-100 text-yellow-800 rounded px-1 mt-1
                            ${isMobile ? "text-[10px] leading-3" : ""}
                          `}>
                            {isMobile ? "GXP" : "GXP Training"}
                          </div>
                        )}
                        {(day >= 10 && day <= 12) && (
                          <div className={`
                            text-xs bg-blue-100 text-blue-800 rounded px-1 mt-1
                            ${isMobile ? "text-[10px] leading-3" : ""}
                          `}>
                            {isMobile ? "Lead" : "Leadership"}
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h3 className="text-lg font-semibold">Training Events</h3>
            <Button size={isMobile ? "sm" : "default"}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-semibold text-sm sm:text-base">{event.title}</h4>
                        <Badge variant={event.status === "Confirmed" ? "default" : "outline"} className="self-start">
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{event.startDate} - {event.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{event.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="self-start">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {isMobile ? (
          <TabsContent value="more" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Schedule</CardTitle>
                  <CardDescription>Your enrolled training sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                      <Badge variant={event.status === "confirmed" ? "default" : "outline"} className="text-xs">
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Calendar Sync
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarSyncSettings />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ) : (
          <>
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

            <TabsContent value="sync" className="space-y-4">
              <CalendarSyncSettings />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Calendar;
