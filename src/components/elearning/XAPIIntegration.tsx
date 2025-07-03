
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Activity, Send, Database, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface XAPIStatement {
  id?: string;
  actor: {
    name: string;
    mbox: string;
  };
  verb: {
    id: string;
    display: { [key: string]: string };
  };
  object: {
    id: string;
    definition?: {
      name: { [key: string]: string };
      description?: { [key: string]: string };
    };
  };
  result?: {
    completion?: boolean;
    success?: boolean;
    score?: {
      scaled?: number;
      raw?: number;
      min?: number;
      max?: number;
    };
  };
  timestamp?: string;
}

const XAPIIntegration = () => {
  const [lrsEndpoint, setLrsEndpoint] = useState('https://cloud.scorm.com/tc/public/');
  const [lrsUsername, setLrsUsername] = useState('');
  const [lrsPassword, setLrsPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [statements, setStatements] = useState<XAPIStatement[]>([]);
  const [newStatement, setNewStatement] = useState({
    verb: 'experienced',
    object: '',
    completion: false,
    success: false,
    score: ''
  });

  // Sample xAPI statements
  const sampleStatements: XAPIStatement[] = [
    {
      id: '1',
      actor: {
        name: 'John Doe',
        mbox: 'mailto:john@example.com'
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/completed',
        display: { 'en-US': 'completed' }
      },
      object: {
        id: 'http://example.com/courses/javascript-basics',
        definition: {
          name: { 'en-US': 'JavaScript Basics Course' }
        }
      },
      result: {
        completion: true,
        success: true,
        score: {
          scaled: 0.85,
          raw: 85,
          min: 0,
          max: 100
        }
      },
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      actor: {
        name: 'Jane Smith',
        mbox: 'mailto:jane@example.com'
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/experienced',
        display: { 'en-US': 'experienced' }
      },
      object: {
        id: 'http://example.com/activities/video-lecture-1',
        definition: {
          name: { 'en-US': 'Introduction to React Video' }
        }
      },
      timestamp: new Date().toISOString()
    }
  ];

  useEffect(() => {
    setStatements(sampleStatements);
  }, []);

  const testLRSConnection = async () => {
    if (!lrsEndpoint || !lrsUsername || !lrsPassword) {
      toast.error('Please fill in all LRS connection details');
      return;
    }

    try {
      // Simulate LRS connection test
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsConnected(true);
      toast.success('Successfully connected to Learning Record Store');
    } catch (error) {
      toast.error('Failed to connect to LRS');
      setIsConnected(false);
    }
  };

  const sendStatement = async () => {
    if (!isConnected) {
      toast.error('Please connect to LRS first');
      return;
    }

    if (!newStatement.object) {
      toast.error('Please specify the learning object');
      return;
    }

    const statement: XAPIStatement = {
      id: Date.now().toString(),
      actor: {
        name: 'Current User',
        mbox: 'mailto:user@example.com'
      },
      verb: {
        id: `http://adlnet.gov/expapi/verbs/${newStatement.verb}`,
        display: { 'en-US': newStatement.verb }
      },
      object: {
        id: newStatement.object,
        definition: {
          name: { 'en-US': newStatement.object.split('/').pop() || 'Learning Activity' }
        }
      },
      result: {
        completion: newStatement.completion,
        success: newStatement.success,
        ...(newStatement.score && {
          score: {
            raw: parseInt(newStatement.score),
            min: 0,
            max: 100,
            scaled: parseInt(newStatement.score) / 100
          }
        })
      },
      timestamp: new Date().toISOString()
    };

    try {
      // Simulate sending statement to LRS
      await new Promise(resolve => setTimeout(resolve, 500));
      setStatements(prev => [statement, ...prev]);
      toast.success('xAPI statement sent successfully');
      
      // Reset form
      setNewStatement({
        verb: 'experienced',
        object: '',
        completion: false,
        success: false,
        score: ''
      });
    } catch (error) {
      toast.error('Failed to send xAPI statement');
    }
  };

  const getVerbColor = (verbId: string) => {
    if (verbId.includes('completed')) return 'bg-green-100 text-green-800';
    if (verbId.includes('passed')) return 'bg-blue-100 text-blue-800';
    if (verbId.includes('failed')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">xAPI (Tin Can API) Integration</h2>
        <p className="text-muted-foreground">
          Track detailed learning experiences and send data to Learning Record Store
        </p>
      </div>

      {/* LRS Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Learning Record Store Configuration
          </CardTitle>
          <CardDescription>
            Configure connection to your xAPI-compliant Learning Record Store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lrs-endpoint">LRS Endpoint URL</Label>
              <Input
                id="lrs-endpoint"
                value={lrsEndpoint}
                onChange={(e) => setLrsEndpoint(e.target.value)}
                placeholder="https://your-lrs.com/xapi/"
              />
            </div>
            <div>
              <Label htmlFor="lrs-username">Username</Label>
              <Input
                id="lrs-username"
                value={lrsUsername}
                onChange={(e) => setLrsUsername(e.target.value)}
                placeholder="LRS Username"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="lrs-password">Password</Label>
            <Input
              id="lrs-password"
              type="password"
              value={lrsPassword}
              onChange={(e) => setLrsPassword(e.target.value)}
              placeholder="LRS Password"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={testLRSConnection}>Test Connection</Button>
            {isConnected && (
              <Badge className="bg-green-100 text-green-800">
                Connected to LRS
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Send New Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send xAPI Statement
          </CardTitle>
          <CardDescription>
            Create and send learning experience statements to the LRS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="verb">Verb</Label>
              <select
                id="verb"
                className="w-full p-2 border rounded-md"
                value={newStatement.verb}
                onChange={(e) => setNewStatement(prev => ({ ...prev, verb: e.target.value }))}
              >
                <option value="experienced">Experienced</option>
                <option value="completed">Completed</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="attempted">Attempted</option>
                <option value="answered">Answered</option>
              </select>
            </div>
            <div>
              <Label htmlFor="object">Learning Object ID</Label>
              <Input
                id="object"
                value={newStatement.object}
                onChange={(e) => setNewStatement(prev => ({ ...prev, object: e.target.value }))}
                placeholder="http://example.com/course/lesson-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="completion"
                checked={newStatement.completion}
                onCheckedChange={(checked) => setNewStatement(prev => ({ ...prev, completion: checked }))}
              />
              <Label htmlFor="completion">Completed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="success"
                checked={newStatement.success}
                onCheckedChange={(checked) => setNewStatement(prev => ({ ...prev, success: checked }))}
              />
              <Label htmlFor="success">Success</Label>
            </div>
            <div>
              <Label htmlFor="score">Score (0-100)</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                value={newStatement.score}
                onChange={(e) => setNewStatement(prev => ({ ...prev, score: e.target.value }))}
                placeholder="85"
              />
            </div>
          </div>
          <Button onClick={sendStatement} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Statement
          </Button>
        </CardContent>
      </Card>

      {/* Statements History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent xAPI Statements
          </CardTitle>
          <CardDescription>
            View recent learning experience statements sent to the LRS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statements.map((statement) => (
              <div key={statement.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{statement.actor.name}</span>
                    <Badge className={getVerbColor(statement.verb.id)}>
                      {statement.verb.display['en-US']}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {statement.timestamp && new Date(statement.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">
                  <strong>Object:</strong> {statement.object.definition?.name?.['en-US'] || statement.object.id}
                </p>
                {statement.result && (
                  <div className="mt-2 flex gap-4 text-sm">
                    {statement.result.completion !== undefined && (
                      <span>Completion: {statement.result.completion ? '✓' : '✗'}</span>
                    )}
                    {statement.result.success !== undefined && (
                      <span>Success: {statement.result.success ? '✓' : '✗'}</span>
                    )}
                    {statement.result.score?.raw && (
                      <span>Score: {statement.result.score.raw}%</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default XAPIIntegration;
