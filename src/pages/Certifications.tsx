
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, CheckCircle, Clock, Download, ExternalLink, Star, Trophy } from "lucide-react";

const Certifications = () => {
  // Mock data - will be replaced with Supabase queries once types are updated
  const mockEarnedCertificates = [
    {
      id: "1",
      title: "React Developer Certification",
      issuer: "Tech Academy",
      earnedDate: "2024-01-15",
      expiryDate: "2026-01-15",
      credentialId: "TEC-REACT-2024-001",
      skills: ["React", "JavaScript", "TypeScript", "Redux"],
      score: 92,
      status: "Active"
    }
  ];

  const mockAvailableCertifications = [
    {
      id: "2",
      title: "Full Stack Web Development",
      issuer: "Code Institute",
      duration: "80 hours",
      level: "Advanced",
      prerequisites: ["Basic JavaScript", "HTML/CSS"],
      skills: ["Node.js", "Express", "MongoDB", "React"],
      price: 299,
      rating: 4.8,
      enrolled: 2450
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      issuer: "Data Academy",
      duration: "60 hours",
      level: "Intermediate",
      prerequisites: ["Basic Statistics", "Python Basics"],
      skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
      price: 249,
      rating: 4.7,
      enrolled: 1890
    }
  ];

  const mockInProgressData = [
    {
      id: "4",
      title: "DevOps Engineering",
      progress: 45,
      estimatedCompletion: "3 weeks",
      nextMilestone: "Docker Containers Module",
      timeSpent: 25
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-corporate-green text-corporate-green';
      case 'Intermediate': return 'bg-corporate-blue text-corporate-blue';
      case 'Advanced': return 'bg-corporate-orange text-corporate-orange';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-corporate-green text-corporate-green';
      case 'Expiring Soon': return 'bg-corporate-orange text-corporate-orange';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <p className="text-muted-foreground">Earn industry-recognized certifications to advance your career</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-corporate-blue bg-corporate-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corporate-blue">Earned Certificates</CardTitle>
            <Award className="h-4 w-4 text-corporate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-blue">{mockEarnedCertificates.length}</div>
            <p className="text-xs text-corporate-blue/70">Professional certifications</p>
          </CardContent>
        </Card>

        <Card className="border-corporate-orange bg-corporate-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-corporate-orange">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-corporate-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-orange">{mockInProgressData.length}</div>
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
              {mockEarnedCertificates.length > 0 
                ? Math.round(mockEarnedCertificates.reduce((acc, cert) => acc + (cert.score || 0), 0) / mockEarnedCertificates.length)
                : 0}%
            </div>
            <p className="text-xs text-corporate-green/70">Certification average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earned">Earned ({mockEarnedCertificates.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({mockAvailableCertifications.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({mockInProgressData.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockEarnedCertificates.map((cert) => (
              <Card key={cert.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>Issued by {cert.issuer}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(cert.status)}>
                      {cert.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Earned:</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(cert.earnedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Score:</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-3 w-3" />
                        {cert.score}%
                      </div>
                    </div>
                  </div>
                  
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
                    Credential ID: {cert.credentialId}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {mockEarnedCertificates.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-muted-foreground">No earned certificates yet. Start by enrolling in available certifications!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockAvailableCertifications.map((cert) => (
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
                      <div className="text-muted-foreground">{cert.duration}</div>
                    </div>
                    <div>
                      <span className="font-medium">Enrolled:</span>
                      <div className="text-muted-foreground">{cert.enrolled.toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-sm">Skills Covered:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {cert.prerequisites.length > 0 && (
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
                      <span className="text-sm font-medium">{cert.rating}</span>
                    </div>
                    <div className="text-lg font-bold">${cert.price}</div>
                  </div>

                  <Button className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
            
            {mockAvailableCertifications.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-muted-foreground">No certifications available at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockInProgressData.map((cert) => (
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
            
            {mockInProgressData.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <p className="text-muted-foreground">No certifications in progress. Start a certification from the Available tab!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Certifications;
