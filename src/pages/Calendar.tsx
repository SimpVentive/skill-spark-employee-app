
import ProgramCalendar from '@/components/calendar/ProgramCalendar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import FeatureIntro from '@/components/shared/FeatureIntro';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <FeatureIntro
          icon={CalendarIcon}
          title="Training Calendar"
          subtitle="Schedule & Events"
          description="View all your upcoming training sessions, assessment deadlines, and learning events in one place. Never miss a session — sync with your external calendar if needed."
          benefits={[
            "See all training events in month, week, or day view",
            "Track upcoming deadlines and session times",
            "Sync with Google Calendar or Outlook",
            "Events from enrolled programs appear automatically",
          ]}
          tips={[
            "Switch between month and week views for different perspectives",
            "Click any event to see full details and location",
          ]}
          color="bg-cyan-500/10 text-cyan-600"
        />
        <ProgramCalendar />
      </div>
    </ProtectedRoute>
  );
};

export default Calendar;
