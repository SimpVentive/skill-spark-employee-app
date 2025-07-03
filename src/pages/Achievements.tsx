
import AchievementsList from '@/components/achievements/AchievementsList';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Achievements = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground mt-1">
            Track your learning milestones and earned badges
          </p>
        </div>
        <AchievementsList />
      </div>
    </ProtectedRoute>
  );
};

export default Achievements;
