
import MediaViewer from '@/components/media/MediaViewer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import FeatureIntro from '@/components/shared/FeatureIntro';
import { Search } from 'lucide-react';

const CourseCatalog = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <MediaViewer />
      </div>
    </ProtectedRoute>
  );
};

export default CourseCatalog;
