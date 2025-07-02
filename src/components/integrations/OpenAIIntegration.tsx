
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bot, MessageSquare, FileText, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const OpenAIIntegration = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const features = [
    {
      icon: FileText,
      title: "Course Summaries",
      description: "Auto-generate concise course summaries"
    },
    {
      icon: MessageSquare,
      title: "Q&A Chatbot",
      description: "AI-powered course assistance"
    },
    {
      icon: HelpCircle,
      title: "Smart Recommendations",
      description: "Personalized learning suggestions"
    }
  ];

  const handleConnect = () => {
    console.log('Connecting OpenAI with features enabled');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-green-600" />
          <CardTitle>OpenAI Integration</CardTitle>
        </div>
        <CardDescription>
          Enhance learning with AI-powered course summaries and Q&A bots
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="openai-enabled">Enable OpenAI Features</Label>
          <Switch
            id="openai-enabled"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>
        
        {isEnabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button onClick={handleConnect} className="w-full">
              Connect OpenAI
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OpenAIIntegration;
