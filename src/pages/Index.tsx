
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Index: Auth state changed', { hasUser: !!user, loading });
    
    if (!loading) {
      if (user) {
        console.log('Index: User authenticated, redirecting to dashboard');
        navigate("/dashboard");
      } else {
        console.log('Index: No user, redirecting to landing');
        navigate("/landing");
      }
    }
  }, [navigate, user, loading]);

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

  // This component will redirect, so we don't need to render anything else
  return null;
};

export default Index;
