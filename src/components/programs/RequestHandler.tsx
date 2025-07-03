
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const handleCannotAttendRequest = async (programId: string, programTitle: string) => {
  try {
    const { error } = await supabase
      .from('user_requests')
      .insert({
        request_type: 'cannot_attend',
        program_id: programId,
        message: `User cannot attend ${programTitle} and requests to notify superior`
      });

    if (error) throw error;
    
    toast.success("Request sent", {
      description: "Your superior has been notified that you cannot attend this program."
    });
  } catch (error) {
    console.error('Error sending request:', error);
    toast.error("Failed to send request", {
      description: "Please try again or contact support."
    });
  }
};

export const handleDateChangeRequest = async (programId: string, programTitle: string, requestedDate: Date) => {
  try {
    const { error } = await supabase
      .from('user_requests')
      .insert({
        request_type: 'date_change',
        program_id: programId,
        requested_date: requestedDate.toISOString().split('T')[0],
        message: `User requests date change for ${programTitle} to ${requestedDate.toLocaleDateString()}`
      });

    if (error) throw error;
    
    toast.success("Request sent", {
      description: "Your date change request has been sent to the Training Manager."
    });
  } catch (error) {
    console.error('Error sending date change request:', error);
    toast.error("Failed to send request", {
      description: "Please try again or contact support."
    });
  }
};

export const handleEnrollmentRequest = async (programId: string, programTitle: string) => {
  try {
    const { error } = await supabase
      .from('user_requests')
      .insert({
        request_type: 'enrollment',
        program_id: programId,
        message: `User requests enrollment in ${programTitle}`
      });

    if (error) throw error;
    
    toast.success("Request sent", {
      description: "Your enrollment request has been sent to your superior."
    });
  } catch (error) {
    console.error('Error sending enrollment request:', error);
    toast.error("Failed to send request", {
      description: "Please try again or contact support."
    });
  }
};
