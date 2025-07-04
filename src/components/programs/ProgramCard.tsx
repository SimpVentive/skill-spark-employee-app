
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, User, Clock, FileText, Eye, EyeOff, Mail, CalendarDays } from "lucide-react";
import DatePickerDialog from "./DatePickerDialog";
import ProgramDetailsDialog from "./ProgramDetailsDialog";
import { handleCannotAttendRequest, handleDateChangeRequest } from "./RequestHandler";
import { toast } from "sonner";

interface Program {
  id: number;
  title: string;
  level: string;
  theme?: string;
  outline: string;
  dates: string;
  venue: string;
  multipleBatches: boolean;
  faculty: string;
  preTest: string;
  preRead: string;
  icon: string;
  type: string;
}

interface ProgramCardProps {
  program: Program;
  isPastProgram?: boolean;
}

const ProgramCard = ({ program, isPastProgram = false }: ProgramCardProps) => {
  const [showFullOutline, setShowFullOutline] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConfirmAttendance = () => {
    toast.success("Attendance confirmed", {
      description: "You have successfully confirmed your attendance for this program."
    });
  };

  const handleCannotAttend = () => {
    handleCannotAttendRequest(program.id.toString(), program.title);
  };

  const handleRequestDateChange = () => {
    setShowDatePicker(true);
  };

  const handleDateChangeRequestSubmit = (selectedDate: Date) => {
    handleDateChangeRequest(program.id.toString(), program.title, selectedDate);
    setShowDatePicker(false);
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
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
                {showFullOutline ? program.outline : `${program.outline.substring(0, 80)}...`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullOutline(!showFullOutline)}
                className="ml-2 p-1 h-auto"
              >
                {showFullOutline ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Dates:</span>
              <span className="text-muted-foreground">{program.dates}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="font-medium">Venue:</span>
              <span className="text-muted-foreground">{program.venue}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-orange-600" />
              <span className="font-medium">Faculty:</span>
              <span className="text-muted-foreground">{program.faculty}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Pre Test:</span>
              <span className="text-muted-foreground">{program.preTest}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-secondary" />
              <span className="font-medium">Pre Read:</span>
              <span className="text-muted-foreground">{program.preRead}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button 
              onClick={handleViewDetails}
              variant="outline"
              className="flex-1 min-w-[120px]"
            >
              View Details
            </Button>

            {!isPastProgram && (
              <>
                <Button 
                  onClick={handleConfirmAttendance}
                  className="flex-1 min-w-[120px]"
                >
                  Confirm Attendance
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleCannotAttend}
                  className="flex-1 min-w-[120px]"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Cannot Attend
                </Button>
                
                {program.multipleBatches && (
                  <Button 
                    variant="secondary" 
                    onClick={handleRequestDateChange}
                    className="flex-1 min-w-[140px]"
                  >
                    <CalendarDays className="h-4 w-4 mr-1" />
                    Request Date Change
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <DatePickerDialog
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onDateSelect={handleDateChangeRequestSubmit}
        programTitle={program.title}
      />

      <ProgramDetailsDialog
        program={program}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        isPastProgram={isPastProgram}
      />
    </>
  );
};

export default ProgramCard;
