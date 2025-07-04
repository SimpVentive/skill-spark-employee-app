
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  FileText, 
  Users, 
  Download,
  Upload,
  Camera,
  BookOpen,
  Award,
  Target
} from "lucide-react";

interface Program {
  id: number;
  title: string;
  level: string;
  theme?: string;
  outline: string;
  dates: string;
  venue: string;
  multipleBatches: boolean;
  faculty: string;
  preTest: string;
  preRead: string;
  icon: string;
  type: string;
}

interface ProgramDetailsDialogProps {
  program: Program | null;
  isOpen: boolean;
  onClose: () => void;
  isPastProgram?: boolean;
}

const ProgramDetailsDialog = ({ program, isOpen, onClose, isPastProgram = false }: ProgramDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!program) return null;

  // Mock data for program details
  const programDetails = {
    brochureUrl: "#",
    participants: [
      { id: 1, name: "John Doe", department: "Engineering" },
      { id: 2, name: "Jane Smith", department: "Marketing" },
      { id: 3, name: "Mike Johnson", department: "Sales" },
      { id: 4, name: "Sarah Wilson", department: "HR" }
    ],
    materials: {
      preProgramMaterial: [
        { id: 1, title: "Introduction to GXP", type: "PDF", url: "#" },
        { id: 2, title: "Compliance Guidelines", type: "Video", url: "#" }
      ],
      postProgramMaterial: [
        { id: 1, title: "Advanced GXP Concepts", type: "PDF", url: "#" },
        { id: 2, title: "Case Studies", type: "Document", url: "#" }
      ]
    },
    assessment: {
      averageScore: 85,
      passingScore: 70,
      completionRate: 92
    },
    certificates: [
      { id: 1, title: "GXP Compliance Certificate", downloadUrl: "#" }
    ],
    projects: [
      {
        id: 1,
        title: "Quality System Implementation",
        type: "Group",
        impactDimension: "Process Improvement",
        description: "Implementation of quality management system in manufacturing",
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        rating: 4.5,
        status: "In Progress"
      }
    ],
    photos: [
      { id: 1, url: "#", caption: "Training session - Day 1", uploadedBy: "Admin" },
      { id: 2, url: "#", caption: "Group activity", uploadedBy: "John Doe" }
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{program.icon}</div>
            <div>
              <DialogTitle className="text-xl">{program.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Badge className={getLevelColor(program.level)}>{program.level}</Badge>
                {program.theme && <Badge variant="outline">{program.theme}</Badge>}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value={isPastProgram ? "results" : "assessment"}>
              {isPastProgram ? "Results" : "Assessment"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Program Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm"><strong>Dates:</strong> {program.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm"><strong>Venue:</strong> {program.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-600" />
                    <span className="text-sm"><strong>Faculty:</strong> {program.faculty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm"><strong>Pre-test:</strong> {program.preTest}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Pre-read Material
                  </Button>
                  {isPastProgram ? (
                    <>
                      <Button variant="outline" className="w-full">
                        <Award className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Notes
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Take Pre-test
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Program Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{program.outline}</p>
              </CardContent>
            </Card>

            {isPastProgram && (
              <Card>
                <CardHeader>
                  <CardTitle>Project Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {programDetails.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{project.title}</h4>
                        <Badge variant={project.type === 'Group' ? 'default' : 'secondary'}>
                          {project.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Impact:</strong> {project.impactDimension}</div>
                        <div><strong>Rating:</strong> {project.rating}/5</div>
                        <div><strong>Start:</strong> {project.startDate}</div>
                        <div><strong>End:</strong> {project.endDate}</div>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isPastProgram ? "Post-Program Materials" : "Pre-Program Materials"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(isPastProgram ? programDetails.materials.postProgramMaterial : programDetails.materials.preProgramMaterial).map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <div>
                          <p className="text-sm font-medium">{material.title}</p>
                          <p className="text-xs text-muted-foreground">{material.type}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {isPastProgram && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Program Photos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {programDetails.photos.map((photo) => (
                      <div key={photo.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          <div>
                            <p className="text-sm font-medium">{photo.caption}</p>
                            <p className="text-xs text-muted-foreground">by {photo.uploadedBy}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                    <Button size="sm" className="w-full mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {isPastProgram ? "Program Participants" : "Confirmed Participants"}
                </CardTitle>
                <CardDescription>
                  {programDetails.participants.length} participants registered
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {programDetails.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">{participant.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value={isPastProgram ? "results" : "assessment"} className="space-y-4">
            {isPastProgram ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{programDetails.assessment.averageScore}%</div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{programDetails.assessment.completionRate}%</div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{programDetails.assessment.passingScore}%</div>
                        <p className="text-sm text-muted-foreground">Passing Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Certificates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {programDetails.certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium">{cert.title}</span>
                        </div>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Assessment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Pre-Program Test</h4>
                      <p className="text-sm text-muted-foreground mb-2">{program.preTest}</p>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Start Test
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Complete pre-reading material</li>
                        <li>• Pass pre-program test (70%)</li>
                        <li>• Attend all sessions</li>
                        <li>• Submit final assignment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsDialog;
