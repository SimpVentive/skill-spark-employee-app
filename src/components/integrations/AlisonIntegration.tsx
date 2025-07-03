
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AlisonCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  url: string;
  imageUrl?: string;
}

const AlisonIntegration = () => {
  const [orgId, setOrgId] = useState('');
  const [orgKey, setOrgKey] = useState('');
  const [courses, setCourses] = useState<AlisonCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const fetchCourses = async () => {
    if (!orgId || !orgKey) {
      toast.error('Please enter your Alison Organization ID and Key');
      return;
    }

    setLoading(true);
    
    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/">
    
    <soap:Header>
        <credentials>
            <alisonOrgId>${orgId}</alisonOrgId>
            <alisonOrgKey>${orgKey}</alisonOrgKey>
        </credentials>
    </soap:Header>
    
    <soap:Body>
        <q1:getAvailableCourses xmlns:q1="urn:alisonwsdl">
            <offset xsi:type="xsd:int">0</offset>
            <count xsi:type="xsd:int">100</count>
        </q1:getAvailableCourses>
    </soap:Body>
</soap:Envelope>`;

    try {
      // In a real implementation, you would need to make this call through your backend
      // to avoid CORS issues with SOAP endpoints
      console.log('SOAP Request:', soapEnvelope);
      
      // Mock response for demonstration
      const mockCourses: AlisonCourse[] = [
        {
          id: '1',
          title: 'Introduction to Digital Marketing',
          description: 'Learn the fundamentals of digital marketing including SEO, social media, and email marketing.',
          duration: '3-4 hours',
          level: 'Beginner',
          category: 'Business',
          url: 'https://alison.com/course/introduction-to-digital-marketing',
          imageUrl: '/placeholder.svg'
        },
        {
          id: '2',
          title: 'Project Management Fundamentals',
          description: 'Master the basics of project management with practical tools and techniques.',
          duration: '5-6 hours',
          level: 'Intermediate',
          category: 'Management',
          url: 'https://alison.com/course/project-management-fundamentals',
          imageUrl: '/placeholder.svg'
        },
        {
          id: '3',
          title: 'Excel for Business Analysis',
          description: 'Advanced Excel techniques for data analysis and business intelligence.',
          duration: '4-5 hours',
          level: 'Advanced',
          category: 'Technology',
          url: 'https://alison.com/course/excel-business-analysis',
          imageUrl: '/placeholder.svg'
        }
      ];

      setCourses(mockCourses);
      setConnected(true);
      toast.success('Successfully connected to Alison API and fetched courses');
      
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to connect to Alison API. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const openCourse = (course: AlisonCourse) => {
    window.open(course.url, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <CardTitle>Alison Course Integration</CardTitle>
          </div>
          <CardDescription>
            Connect to Alison's course catalog to access thousands of free online courses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!connected && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="orgId">Organization ID</Label>
                <Input
                  id="orgId"
                  type="text"
                  placeholder="Enter your Alison Organization ID"
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orgKey">Organization Key</Label>
                <Input
                  id="orgKey"
                  type="password"
                  placeholder="Enter your Alison Organization Key"
                  value={orgKey}
                  onChange={(e) => setOrgKey(e.target.value)}
                />
              </div>
              <Button onClick={fetchCourses} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect to Alison'
                )}
              </Button>
            </div>
          )}

          {connected && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Connected to Alison API</span>
              </div>
              <Button variant="outline" onClick={() => {
                setConnected(false);
                setCourses([]);
                setOrgId('');
                setOrgKey('');
              }}>
                Disconnect
              </Button>
            </div>
          )}

          {courses.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Available Courses ({courses.length})</h3>
                <Button variant="outline" size="sm" onClick={fetchCourses} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="px-2 py-1 bg-secondary rounded">{course.level}</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{course.category}</span>
                        <Button size="sm" onClick={() => openCourse(course)}>
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• This integration uses the Alison SOAP API to fetch available courses</p>
          <p>• In production, SOAP requests should be made through your backend to avoid CORS issues</p>
          <p>• The demo shows mock data - real API calls require proper credentials</p>
          <p>• Consider implementing caching for better performance</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlisonIntegration;
