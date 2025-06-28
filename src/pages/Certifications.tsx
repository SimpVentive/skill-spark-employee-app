import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, CheckCircle, Clock, Download, ExternalLink, Star, Trophy } from "lucide-react";

const Certifications = () => {
  const earnedCertificates = [
    {
      id: 1,
      title: "React Developer Certification",
      issuer: "SkillSpark Academy",
      earnedDate: "2024-05-15",
      expiryDate: "2026-05-15",
      credentialId: "RSK-2024-001234",
      skills: ["React", "JavaScript", "Frontend Development"],
      score: 95,
      status: "Active"
    },
    {
      id: 2,
      title: "Project Management Professional",
      issuer: "PM Institute",
      earnedDate: "2024-03-22",
      expiryDate: "2027-03-22",
      credentialId: "PMP-2024-005678",
      skills: ["Project Management", "Leadership", "Agile"],
      score: 88,
      status: "Active"
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      issuer: "Marketing Academy",
      earnedDate: "2024-01-10",
      expiryDate: "2025-01-10",
      credentialId: "DMS-2024-009876",
      skills: ["SEO", "Social Media", "Analytics"],
      score: 92,
      status: "Expiring Soon"
    }
  ];

  const availableCertifications = [
    {
      id: 1,
      title: "Advanced JavaScript Certification",
      issuer: "SkillSpark Academy",
      duration: "40 hours",
      level: "Advanced",
      prerequisites: ["Basic JavaScript", "ES6+ Knowledge"],
      skills: ["Advanced JavaScript", "Async Programming", "Design Patterns"],
      price: 199,
      rating: 4.8,
      enrolled: 1234
    },
    {
      id: 2,
      title: "Cloud Architecture Certification",
      issuer: "Cloud Institute",
      duration: "60 hours",
      level: "Expert",
      prerequisites: ["Cloud Basics", "System Design"],
      skills: ["AWS", "System Design", "Microservices"],
      price: 299,
      rating: 4.9,
      enrolled: 856
    },
    {
      id: 3,
      title: "UX Design Professional",
      issuer: "Design Academy",
      duration: "35 hours",
      level: "Intermediate",
      prerequisites: ["Design Basics", "User Research"],
      skills: ["User Research", "Prototyping", "Design Systems"],
      price: 249,
      rating: 4.7,
      enrolled: 967
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      issuer: "Data Institute",
      duration: "50 hours",
      level: "Beginner",
      prerequisites: ["Basic Statistics", "Python Basics"],
      skills: ["Python", "Statistics", "Machine Learning"],
      price: 179,
      rating: 4.6,
      enrolled: 2145
    }
  ];

  const inProgress = [
    {
      id: 1,
      title: "Advanced JavaScript Certification",
      progress: 75,
      estimatedCompletion: "2 weeks",
      nextMilestone: "Final Assessment",
      timeSpent: 30
    },
    {
      id: 2,
      title: "Cloud Architecture Certification",
      progress: 45,
      estimatedCompletion: "1 month",
      nextMilestone: "Module 4: Security",
      timeSpent: 27
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
            <div className="text-2xl font-bold text-corporate-orange">{inProgress.length}</div>
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
              {Math.round(earnedCertificates.reduce((acc, cert) => acc + cert.score, 0) / earnedCertificates.length)}%
            </div>
            <p className="text-xs text-corporate-green/70">Certification average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earned">Earned ({earnedCertificates.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableCertifications.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgress.length})</TabsTrigger>
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

                  <div>
                    <span className="font-medium text-sm">Prerequisites:</span>
                    <ul className="text-xs text-muted-foreground mt-1">
                      {cert.prerequisites.map((prereq, index) => (
                        <li key={index}>• {prereq}</li>
                      ))}
                    </ul>
                  </div>

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
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inProgress.map((cert) => (
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Certifications;
