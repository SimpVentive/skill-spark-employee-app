
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCalendarSync } from "@/hooks/useCalendarSync";
import { Calendar, Clock, RefreshCw, Unlink, Link } from "lucide-react";

const CalendarSyncSettings = () => {
  const { syncSettings, events, loading, connectProvider, disconnectProvider, syncCalendar } = useCalendarSync();

  const googleSync = syncSettings.find(s => s.provider === 'google');
  const outlookSync = syncSettings.find(s => s.provider === 'outlook');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Google Calendar */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285f4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34a853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#fbbc04"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#ea4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">Google Calendar</span>
                </div>
                {googleSync ? (
                  <Badge variant="default">Connected</Badge>
                ) : (
                  <Badge variant="outline">Not Connected</Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                {googleSync ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => syncCalendar(googleSync.id)}
                      disabled={loading}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Sync Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => disconnectProvider(googleSync.id)}
                    >
                      <Unlink className="h-4 w-4 mr-1" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => connectProvider('google')}
                    disabled={loading}
                  >
                    <Link className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </div>

            {/* Outlook Calendar */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="#0078d4" viewBox="0 0 24 24">
                    <path d="M7.462 19.462h12.846c.897 0 1.692-.795 1.692-1.692V6.231c0-.897-.795-1.692-1.692-1.692H7.462v14.923zM2 6.231v11.538c0 .897.795 1.692 1.692 1.692h4.923V4.538H3.692C2.795 4.538 2 5.333 2 6.231z"/>
                  </svg>
                  <span className="font-medium">Outlook Calendar</span>
                </div>
                {outlookSync ? (
                  <Badge variant="default">Connected</Badge>
                ) : (
                  <Badge variant="outline">Not Connected</Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                {outlookSync ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => syncCalendar(outlookSync.id)}
                      disabled={loading}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Sync Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => disconnectProvider(outlookSync.id)}
                    >
                      <Unlink className="h-4 w-4 mr-1" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => connectProvider('outlook')}
                    disabled={loading}
                  >
                    <Link className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Synced Training Deadlines ({events.length})
            </h4>
            {events.length > 0 ? (
              <div className="space-y-2">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{event.title}</h5>
                        {event.description && (
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(event.start_time).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.start_time).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {events.length > 3 && (
                  <p className="text-sm text-muted-foreground text-center">
                    And {events.length - 3} more events...
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No synced events yet. Connect a calendar and sync to see your training deadlines.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSyncSettings;
