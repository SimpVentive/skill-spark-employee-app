
import MediaViewer from '@/components/media/MediaViewer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import FeatureIntro from '@/components/shared/FeatureIntro';
import { Search } from 'lucide-react';

const CourseCatalog = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <FeatureIntro
          icon={Search}
          title="Course Catalog"
          subtitle="Browse & Enrol"
          description="The Course Catalog is your library of all available training courses and programs. Search by name, filter by category or difficulty level, and enrol in courses that match your development needs. New courses are added regularly."
          benefits={[
            "Browse all available courses in one place",
            "Filter by category, difficulty level, or duration",
            "Enrol in courses that match your development plan",
            "Preview course content before enrolling",
          ]}
          tips={[
            "Use the search bar to quickly find specific topics",
            "Bookmark courses you're interested in for later",
            "Check with your manager about recommended courses",
          ]}
          color="bg-purple-500/10 text-purple-600"
        />
        <MediaViewer />
      </div>
    </ProtectedRoute>
  );
};

export default CourseCatalog;
