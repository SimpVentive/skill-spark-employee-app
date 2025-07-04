
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, TrendingUp, Users, Target, Clock, Star } from "lucide-react";

const AIRecommendations = () => {
  const [recommendations] = useState([
    {
      id: 1,
      title: "Advanced Risk Assessment Techniques",
      reason: "Based on your role and recent activity",
      confidence: 92,
      duration: "3.5 hours",
      rating: 4.8,
      enrolledPeers: 12,
      category: "Risk Management",
      urgency: "high",
      thumbnail: "🎯"
    },
    {
      id: 2,
      title: "Regulatory Compliance Updates 2024",
      reason: "Trending in Banking sector",
      confidence: 88,
      duration: "2 hours",
      rating: 4.9,
      enrolledPeers: 25,
      category: "Compliance",
      urgency: "medium",
      thumbnail: "📋"
    },
    {
      id: 3,
      title: "Data Visualization for Risk Analysis",
      reason: "Skills gap identified in your profile",
      confidence: 85,
      duration: "4 hours",
      rating: 4.7,
      enrolledPeers: 8,
      category: "Data Analytics",
      urgency: "low",
      thumbnail: "📊"
    }
  ]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            AI-Powered Recommendations
          </CardTitle>
          <p className="text-purple-100">
            Personalized content based on your learning patterns, role, and industry trends
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className={getUrgencyColor(rec.urgency)}>
                  {rec.urgency} priority
                </Badge>
                <div className="flex items-center gap-1 text-sm font-medium text-purple-600">
                  <Sparkles className="h-4 w-4" />
                  {rec.confidence}% match
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{rec.thumbnail}</div>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <Badge variant="outline" className="mt-2">
                  {rec.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-700 font-medium">Why recommended:</p>
                <p className="text-sm text-purple-600">{rec.reason}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{rec.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{rec.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{rec.enrolledPeers} of your peers enrolled</span>
              </div>
              
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <TrendingUp className="h-3 w-3 mt-0.5" />
                <span>This course is trending up 15% in your industry</span>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Start Learning
                </Button>
                <Button variant="outline" size="sm">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Peer Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Popular Among Your Peers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Sarah Chen", course: "Advanced Excel for Risk Analysis", avatar: "SC" },
              { name: "Mike Johnson", course: "Leadership in Crisis Management", avatar: "MJ" },
              { name: "Lisa Wang", course: "Python for Financial Analysis", avatar: "LW" }
            ].map((peer, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {peer.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{peer.name}</span> is taking
                  </p>
                  <p className="text-sm font-medium text-blue-600">{peer.course}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Course
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
