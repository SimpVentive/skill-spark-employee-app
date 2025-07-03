
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, User, Clock, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { handleEnrollmentRequest } from "./RequestHandler";

const EligiblePrograms = () => {
  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['eligible-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          program_sessions (*)
        `)
        .eq('program_type', 'eligible');
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading eligible programs...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Programs You Can Apply For</h3>
        <p className="text-muted-foreground">Request enrollment in these development programs</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((program) => {
          const session = program.program_sessions?.[0];
          
          return (
            <Card key={program.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{program.icon}</span>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{program.level}</Badge>
                      {program.theme && <Badge variant="secondary">{program.theme}</Badge>}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription>{program.outline}</CardDescription>
                
                <div className="space-y-2">
                  {session && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{session.start_date} to {session.end_date}</span>
                    </div>
                  )}
                  
                  {program.venue && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{program.venue}</span>
                    </div>
                  )}
                  
                  {program.faculty && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{program.faculty}</span>
                    </div>
                  )}
                  
                  {session?.max_participants && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Max participants: {session.max_participants}</span>
                    </div>
                  )}
                </div>

                {(program.pre_test_info || program.pre_read_info) && (
                  <div className="space-y-2 pt-2 border-t">
                    <h4 className="font-medium text-sm">Preparation Required:</h4>
                    {program.pre_test_info && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mt-0.5" />
                        <span><strong>Pre-test:</strong> {program.pre_test_info}</span>
                      </div>
                    )}
                    {program.pre_read_info && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mt-0.5" />
                        <span><strong>Pre-reading:</strong> {program.pre_read_info}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => handleEnrollmentRequest(program.id, program.title)}
                  >
                    Request Enrollment
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EligiblePrograms;
