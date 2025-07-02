
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Index: Auth state changed', { hasUser: !!user, loading });
    
    if (!loading && user) {
      console.log('Index: User authenticated, redirecting to dashboard');
      navigate("/dashboard");
    }
    // If no user and not loading, stay on landing page (don't redirect to auth)
  }, [navigate, user, loading]);

  // If user is authenticated, show loading while redirecting
  if (!loading && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SkillSpark...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not loading, redirect to landing page
  navigate("/landing");
  return null;
};

export default Index;
