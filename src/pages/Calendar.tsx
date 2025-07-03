
import ProgramCalendar from '@/components/calendar/ProgramCalendar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Calendar = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View your scheduled programs and training sessions
          </p>
        </div>
        <ProgramCalendar />
      </div>
    </ProtectedRoute>
  );
};

export default Calendar;
