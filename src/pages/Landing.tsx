
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle,
  Calendar
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Course Catalog",
      description: "Access comprehensive learning materials and external integrations"
    },
    {
      icon: Trophy,
      title: "Achievements & Badges",
      description: "Earn certifications and track your progress with gamification"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track engagement metrics with Google Analytics 4 and advanced reporting"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers and participate in group learning activities"
    }
  ];

  const integrations = [
    "Google Analytics 4 & Mixpanel for engagement tracking",
    "xAPI/TinCan API for standardized learning data",
    "OpenAI API for AI-powered course summaries",
    "LinkedIn Learning & Coursera API integration",
    "Amazon Personalize for course recommendations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SkillSpark</h1>
          </div>
          <div className="space-x-4">
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Empower Your Team with 
            <span className="text-blue-600"> AI-Driven Learning</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your organization's learning experience with our comprehensive platform 
            that integrates cutting-edge AI, analytics, and collaborative tools.
          </p>
          <div className="space-x-4">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Modern Learning
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines the best learning tools with powerful analytics and AI capabilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* API Integrations Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Powerful API Integrations
              </h3>
              <p className="text-lg text-gray-600">
                Connect with the tools you already use and love
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{integration}</span>
                  </div>
                ))}
              </div>
              
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <h4 className="text-xl font-semibold">AI-Powered Features</h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Automated course summaries and Q&A bots</li>
                  <li>• Personalized learning recommendations</li>
                  <li>• Smart skill gap analysis</li>
                  <li>• Predictive learning analytics</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Learning?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of organizations already using SkillSpark to enhance their learning and development programs.
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-6 w-6" />
            <span className="text-xl font-bold">SkillSpark</span>
          </div>
          <p className="text-gray-400">
            © 2024 SkillSpark. Empowering organizations through intelligent learning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
