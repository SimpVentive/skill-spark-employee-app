
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
    }
  };

  const handleCancel = () => {
    setSelectedDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Date Change</DialogTitle>
          <DialogDescription>
            Select your preferred alternative date for "{programTitle}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedDate}>
            Request Change
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
