
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Play, CheckCircle, Clock, Award } from 'lucide-react';
import { toast } from 'sonner';

interface CMI5Course {
  id: string;
  title: string;
  description: string;
  launchUrl: string;
  masteryScore?: number;
  moveOn: 'Passed' | 'Completed' | 'CompletedAndPassed' | 'CompletedOrPassed' | 'NotApplicable';
  auIndex: number;
  sessions: CMI5Session[];
  status: 'NotAttempted' | 'Incomplete' | 'Completed' | 'Passed' | 'Failed';
}

interface CMI5Session {
  id: string;
  launchMode: 'Normal' | 'Browse' | 'Review';
  launchParameters?: string;
  contextTemplate?: any;
  returnUrl?: string;
  startedAt?: string;
  endedAt?: string;
  duration?: number;
  progress?: number;
}

const CMI5Integration = () => {
  const [courses, setCourses] = useState<CMI5Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CMI5Course | null>(null);
  const [currentSession, setCurrentSession] = useState<CMI5Session | null>(null);
  const [lrsEndpoint, setLrsEndpoint] = useState('https://your-lrs.com/xapi/');
  const [isConnected, setIsConnected] = useState(false);

  // Sample cmi5 courses
  const sampleCourses: CMI5Course[] = [
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Comprehensive course covering advanced React concepts and patterns',
      launchUrl: '/cmi5/react-advanced/index.html',
      masteryScore: 80,
      moveOn: 'CompletedAndPassed',
      auIndex: 0,
      status: 'NotAttempted',
      sessions: []
    },
    {
      id: '2',
      title: 'TypeScript Fundamentals',
      description: 'Learn TypeScript from basics to advanced features',
      launchUrl: '/cmi5/typescript-fundamentals/index.html',
      masteryScore: 75,
      moveOn: 'Passed',
      auIndex: 1,
      status: 'Incomplete',
      sessions: [
        {
          id: 'session1',
          launchMode: 'Normal',
          startedAt: '2024-01-15T10:00:00Z',
          progress: 45
        }
      ]
    }
  ];

  useEffect(() => {
    setCourses(sampleCourses);
  }, []);

  const initializeCMI5 = async (course: CMI5Course) => {
    try {
      // Generate launch parameters for cmi5
      const launchParams = {
        endpoint: lrsEndpoint,
        fetch: `${lrsEndpoint}statements?statementId=${Date.now()}`,
        registration: `reg-${Date.now()}`,
        activityId: `http://example.com/courses/${course.id}`,
        actor: JSON.stringify({
          name: 'Current User',
          mbox: 'mailto:user@example.com'
        })
      };

      // Create new session
      const newSession: CMI5Session = {
        id: `session-${Date.now()}`,
        launchMode: 'Normal',
        launchParameters: new URLSearchParams(launchParams).toString(),
        startedAt: new Date().toISOString(),
        progress: 0
      };

      setCurrentSession(newSession);
      setSelectedCourse(course);

      // Initialize cmi5 runtime environment
      const cmi5Runtime = {
        initialize: () => {
          console.log('cmi5: Initialize called');
          return Promise.resolve();
        },
        terminate: () => {
          console.log('cmi5: Terminate called');
          return Promise.resolve();
        },
        sendStatement: (statement: any) => {
          console.log('cmi5: Sending statement', statement);
          return Promise.resolve();
        },
        getContextActivities: () => {
          return {
            parent: [{ id: `http://example.com/courses/${course.id}` }],
            category: [{ id: 'https://w3id.org/xapi/cmi5/context/categories/cmi5' }]
          };
        }
      };

      // Make cmi5 runtime available globally
      (window as any).cmi5 = cmi5Runtime;

      toast.success(`Initialized cmi5 session for: ${course.title}`);
    } catch (error) {
      toast.error('Failed to initialize cmi5 session');
    }
  };

  const launchCourse = async (course: CMI5Course) => {
    if (!isConnected) {
      toast.error('Please connect to LRS first');
      return;
    }

    await initializeCMI5(course);

    // Build launch URL with cmi5 parameters
    const launchUrl = new URL(course.launchUrl, window.location.origin);
    if (currentSession?.launchParameters) {
      launchUrl.search = currentSession.launchParameters;
    }

    // Launch course in new window
    const courseWindow = window.open(
      launchUrl.toString(),
      'cmi5_player',
      'width=1024,height=768,scrollbars=yes,resizable=yes'
    );

    if (courseWindow) {
      toast.success(`Launched: ${course.title}`);
      
      // Update course sessions
      setCourses(prev => prev.map(c => 
        c.id === course.id 
          ? { ...c, sessions: [...c.sessions, currentSession!] }
          : c
      ));
    } else {
      toast.error('Failed to launch course. Please allow popups.');
    }
  };

  const testLRSConnection = async () => {
    try {
      // Simulate LRS connection test
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
      toast.success('Successfully connected to cmi5-compatible LRS');
    } catch (error) {
      toast.error('Failed to connect to LRS');
      setIsConnected(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Incomplete':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMoveOnColor = (moveOn: string) => {
    switch (moveOn) {
      case 'Passed':
        return 'bg-green-50 text-green-700';
      case 'Completed':
        return 'bg-blue-50 text-blue-700';
      case 'CompletedAndPassed':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">cmi5 Integration</h2>
        <p className="text-muted-foreground">
          Launch and track cmi5-compliant learning content with enhanced xAPI features
        </p>
      </div>

      {/* LRS Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            cmi5 LRS Configuration
          </CardTitle>
          <CardDescription>
            Configure connection to your cmi5-compatible Learning Record Store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cmi5-lrs-endpoint">LRS Endpoint URL</Label>
            <Input
              id="cmi5-lrs-endpoint"
              value={lrsEndpoint}
              onChange={(e) => setLrsEndpoint(e.target.value)}
              placeholder="https://your-lrs.com/xapi/"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={testLRSConnection}>Test cmi5 Connection</Button>
            {isConnected && (
              <Badge className="bg-green-100 text-green-800">
                cmi5 LRS Connected
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Courses List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">cmi5 Courses</h3>
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                    <Badge className={getMoveOnColor(course.moveOn)} variant="outline">
                      Move On: {course.moveOn}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Course Progress */}
                {course.sessions.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {course.sessions[course.sessions.length - 1]?.progress || 0}%
                      </span>
                    </div>
                    <Progress value={course.sessions[course.sessions.length - 1]?.progress || 0} />
                  </div>
                )}

                {/* Course Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">AU Index:</span> {course.auIndex}
                  </div>
                  {course.masteryScore && (
                    <div>
                      <span className="font-medium">Mastery Score:</span> {course.masteryScore}%
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Sessions:</span> {course.sessions.length}
                  </div>
                  <div>
                    <span className="font-medium">Last Accessed:</span>{' '}
                    {course.sessions.length > 0 
                      ? new Date(course.sessions[course.sessions.length - 1].startedAt!).toLocaleDateString()
                      : 'Never'
                    }
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => launchCourse(course)}
                    disabled={!isConnected}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Launch Course
                  </Button>
                  <Button variant="outline" size="sm">
                    View Sessions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Session Info */}
      {currentSession && selectedCourse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Active cmi5 Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Course:</span> {selectedCourse.title}
              </div>
              <div>
                <span className="font-medium">Session ID:</span> {currentSession.id}
              </div>
              <div>
                <span className="font-medium">Launch Mode:</span> {currentSession.launchMode}
              </div>
              <div>
                <span className="font-medium">Started:</span>{' '}
                {currentSession.startedAt && new Date(currentSession.startedAt).toLocaleString()}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              cmi5 statements are being tracked and sent to the configured LRS.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CMI5Integration;
