
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, CheckCircle, Clock, Download, ExternalLink, Star, Trophy } from "lucide-react";
import FeatureIntro from "@/components/shared/FeatureIntro";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface EarnedCertificate {
  id: string;
  title: string;
  issuer: string;
  earned_date: string;
  expiry_date: string | null;
  credential_id: string;
  skills: string[];
  score: number | null;
  status: string | null;
}

interface AvailableCertification {
  id: string;
  title: string;
  issuer: string;
  duration_hours: number | null;
  level: string;
  prerequisites: string[] | null;
  skills_covered: string[] | null;
  price: number | null;
  rating: number;
  enrolled: number;
}

interface InProgressCertification {
  id: string;
  title: string;
  progress: number;
  estimatedCompletion: string;
  nextMilestone: string;
  timeSpent: number;
}

const Certifications = () => {
  // Fetch earned certifications
  const { data: earnedCertificates = [] } = useQuery({
    queryKey: ['earned-certifications'],
    queryFn: async () => {
      console.log('Fetching earned certifications...');
      
      const { data, error } = await supabase
        .from('user_certifications')
        .select(`
          *,
          certifications (
            title,
            issuer,
            skills_covered
          )
        `);

      if (error) {
        console.error('Error fetching earned certifications:', error);
        return [];
      }

      console.log('Raw earned certifications:', data);

      const processedData: EarnedCertificate[] = (data || []).map(cert => ({
        id: cert.id,
        title: cert.certifications?.title || 'Unknown Certification',
        issuer: cert.certifications?.issuer || 'Unknown Issuer',
        earned_date: cert.earned_date,
        expiry_date: cert.expiry_date,
        credential_id: cert.credential_id,
        skills: cert.certifications?.skills_covered || [],
        score: cert.score,
        status: cert.status
      }));

      console.log('Processed earned certifications:', processedData);
      return processedData;
    }
  });

  // Fetch available certifications
  const { data: availableCertifications = [] } = useQuery({
    queryKey: ['available-certifications'],
    queryFn: async () => {
      console.log('Fetching available certifications...');
      
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching available certifications:', error);
        return [];
      }

      console.log('Raw available certifications:', data);

      const processedData: AvailableCertification[] = (data || []).map(cert => ({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuer,
        duration_hours: cert.duration_hours,
        level: cert.level,
        prerequisites: cert.prerequisites,
        skills_covered: cert.skills_covered,
        price: cert.price ? Number(cert.price) : null,
        rating: 4.5 + Math.random() * 0.5, // Mock rating between 4.5-5.0
        enrolled: Math.floor(Math.random() * 3000) + 500 // Mock enrollment count
      }));

      console.log('Processed available certifications:', processedData);
      return processedData;
    }
  });

  // Mock in progress data since we don't have user context
  const inProgressData: InProgressCertification[] = [];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-corporate-green text-corporate-green';
      case 'intermediate': return 'bg-corporate-blue text-corporate-blue';
      case 'advanced': return 'bg-corporate-orange text-corporate-orange';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'active': return 'bg-corporate-green text-corporate-green';
      case 'expiring_soon': return 'bg-corporate-orange text-corporate-orange';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
      <FeatureIntro
        icon={Award}
        title="Certifications"
        subtitle="Professional Credentials"
        description="Certifications are industry-recognised credentials that prove your expertise. Unlike regular course completions, certifications carry formal recognition from issuing bodies. Track prerequisites, manage expiry dates, and start your certification journey here."
        benefits={[
          "Earn formally recognised professional certifications",
          "Track expiry dates so you never miss a renewal",
          "See prerequisites and eligibility requirements upfront",
          "Download and share your earned certificates",
        ]}
        tips={[
          "Check prerequisites before starting a certification path",
          "Set calendar reminders for certifications nearing expiry",
          "Some certifications require completing specific learning paths first",
        ]}
        color="bg-emerald-500/10 text-emerald-600"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-corporate-blue bg-corporate-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corporate-blue">Earned Certificates</CardTitle>
            <Award className="h-4 w-4 text-corporate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-blue">{earnedCertificates.length}</div>
            <p className="text-xs text-corporate-blue/70">Professional certifications</p>
          </CardContent>
        </Card>

        <Card className="border-corporate-orange bg-corporate-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corporate-orange">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-corporate-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-orange">{inProgressData.length}</div>
            <p className="text-xs text-corporate-orange/70">Currently pursuing</p>
          </CardContent>
        </Card>

        <Card className="border-corporate-green bg-corporate-green">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corporate-green">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-corporate-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-green">
              {earnedCertificates.length > 0 
                ? Math.round(earnedCertificates.reduce((acc, cert) => acc + (cert.score || 0), 0) / earnedCertificates.length)
                : 0}%
            </div>
            <p className="text-xs text-corporate-green/70">Certification average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earned">Earned ({earnedCertificates.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableCertifications.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgressData.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {earnedCertificates.map((cert) => (
              <Card key={cert.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>Issued by {cert.issuer}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(cert.status)}>
                      {cert.status || 'Active'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Earned:</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(cert.earned_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Score:</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {cert.score || 'N/A'}%
                      </div>
                    </div>
                  </div>
                  
                  {cert.skills && cert.skills.length > 0 && (
                    <div>
                      <span className="font-medium text-sm">Skills Verified:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Verify
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Credential ID: {cert.credential_id}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {earnedCertificates.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-muted-foreground">No earned certificates yet. Start by enrolling in available certifications!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCertifications.map((cert) => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <Badge className={getLevelColor(cert.level)}>
                        {cert.level}
                      </Badge>
                    </div>
                    <CardDescription>by {cert.issuer}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Duration:</span>
                      <div className="text-muted-foreground">
                        {cert.duration_hours ? `${cert.duration_hours} hours` : 'TBD'}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Enrolled:</span>
                      <div className="text-muted-foreground">{cert.enrolled.toLocaleString()}</div>
                    </div>
                  </div>

                  {cert.skills_covered && cert.skills_covered.length > 0 && (
                    <div>
                      <span className="font-medium text-sm">Skills Covered:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.skills_covered.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {cert.prerequisites && cert.prerequisites.length > 0 && (
                    <div>
                      <span className="font-medium text-sm">Prerequisites:</span>
                      <ul className="text-xs text-muted-foreground mt-1">
                        {cert.prerequisites.map((prereq, index) => (
                          <li key={index}>• {prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{cert.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-lg font-bold">
                      {cert.price ? `$${cert.price}` : 'Free'}
                    </div>
                  </div>

                  <Button className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
            
            {availableCertifications.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-muted-foreground">No certifications available at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inProgressData.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{cert.title}</CardTitle>
                  <CardDescription>
                    {cert.timeSpent} hours completed • {cert.estimatedCompletion} remaining
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-2" />
                  </div>

                  <div className="p-3 bg-corporate-blue rounded-lg">
                    <div className="text-sm font-medium text-corporate-blue">Next Milestone</div>
                    <div className="text-sm text-corporate-blue/80">{cert.nextMilestone}</div>
                  </div>

                  <Button className="w-full">Continue Learning</Button>
                </CardContent>
              </Card>
            ))}
            
            {inProgressData.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-muted-foreground">No certifications in progress. Start a certification from the Available tab!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default Certifications;
