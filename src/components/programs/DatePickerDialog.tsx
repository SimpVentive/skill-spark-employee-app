
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  programTitle: string;
}

const DatePickerDialog = ({ isOpen, onClose, onDateSelect, programTitle }: DatePickerDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
      setSelectedDate(undefined);
    }
  };

  const handleCancel = () => {
    setSelectedDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Date Change</DialogTitle>
          <DialogDescription>
            Select your preferred date for: <strong>{programTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
          
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedDate}
              className="flex-1"
            >
              Request Change
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
