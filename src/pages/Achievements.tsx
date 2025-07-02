
import BadgeSystem from '@/components/gamification/BadgeSystem';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Achievements = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <BadgeSystem />
      </div>
    </ProtectedRoute>
  );
};

export default Achievements;
