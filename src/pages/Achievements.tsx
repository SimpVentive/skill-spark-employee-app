
import AchievementsList from '@/components/achievements/AchievementsList';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import FeatureIntro from '@/components/shared/FeatureIntro';
import { Trophy } from 'lucide-react';

const Achievements = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <FeatureIntro
          icon={Trophy}
          title="Achievements"
          subtitle="Badges & Milestones"
          description="Achievements are badges and milestones you earn as you learn. Complete courses, maintain streaks, help peers, and hit performance targets to unlock rewards. They're a visual record of your professional growth."
          benefits={[
            "Earn badges for completing courses and learning paths",
            "Track your learning streak and consistency",
            "Unlock milestones for performance improvements",
            "Visible to you and your manager as proof of growth",
          ]}
          tips={[
            "Keep your daily learning streak going for bonus badges",
            "Some badges are rare — check what's available to unlock next",
          ]}
          color="bg-yellow-500/10 text-yellow-600"
        />
        <AchievementsList />
      </div>
    </ProtectedRoute>
  );
};

export default Achievements;
