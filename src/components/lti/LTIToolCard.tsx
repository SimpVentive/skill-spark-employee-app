
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Settings, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LTITool {
  id: string;
  name: string;
  description: string;
  tool_url: string;
  launch_url: string;
  icon_url?: string;
  category?: string;
  grade_passback_enabled: boolean;
  deep_linking_enabled: boolean;
  names_roles_service_enabled: boolean;
  assignments_grades_service_enabled: boolean;
  is_active: boolean;
  lti_providers?: {
    name: string;
    lti_version: string;
  } | null;
}

interface Props {
  tool: LTITool;
  onLaunch?: (toolId: string) => void;
}

const LTIToolCard = ({ tool, onLaunch }: Props) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  // Safely get LTI version with fallback
  const ltiVersion = tool.lti_providers?.lti_version || 'LTI-1p1';
  const providerName = tool.lti_providers?.name || 'Unknown Provider';
  const isLTI13 = ltiVersion === 'LTI-1p3';

  const handleLaunch = async () => {
    if (!onLaunch) {
      // Default launch behavior if no custom handler provided
      setIsLaunching(true);
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to launch learning tools.",
            variant: "destructive",
          });
          return;
        }

        // Call the LTI launch edge function
        const { data, error } = await supabase.functions.invoke('lti-launch', {
          body: {
            tool_id: tool.id,
            user_id: user.id,
            context_id: 'skillspark-catalog',
            resource_link_id: `skillspark-${tool.id}-${Date.now()}`,
            return_url: window.location.href
          }
        });

        if (error) throw error;

        if (data.success) {
          // Create a form and submit it to launch the tool
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = data.launch_url;
          form.target = '_blank';

          // Add all launch parameters as hidden form fields
          Object.entries(data.launch_params).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = String(value);
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);

          const versionText = isLTI13 ? "LTI 1.3" : "LTI 1.1";
          toast({
            title: "Tool Launched",
            description: `${tool.name} (${versionText}) has been opened in a new window.`,
          });
        }
      } catch (error) {
        console.error('Launch error:', error);
        toast({
          title: "Launch Failed",
          description: "Failed to launch the learning tool. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLaunching(false);
      }
    } else {
      onLaunch(tool.id);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {tool.icon_url ? (
              <img 
                src={tool.icon_url} 
                alt={tool.name}
                className="w-10 h-10 rounded-lg"
                onError={(e) => {
                  // Hide broken images
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                {isLTI13 ? (
                  <Zap className="w-5 h-5 text-primary" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-primary" />
                )}
              </div>
            )}
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {tool.name}
                {isLTI13 && (
                  <Badge variant="default" className="text-xs bg-blue-500">
                    1.3
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-sm">
                by {providerName}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {ltiVersion}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {tool.description || "External learning tool integrated via LTI"}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.category && (
            <Badge variant="outline" className="text-xs">
              {tool.category}
            </Badge>
          )}
          {tool.grade_passback_enabled && (
            <Badge variant="outline" className="text-xs">
              Grade Passback
            </Badge>
          )}
          {tool.deep_linking_enabled && (
            <Badge variant="outline" className="text-xs">
              Deep Linking
            </Badge>
          )}
          {tool.names_roles_service_enabled && (
            <Badge variant="outline" className="text-xs">
              Names & Roles
            </Badge>
          )}
          {tool.assignments_grades_service_enabled && (
            <Badge variant="outline" className="text-xs">
              Assignments & Grades
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleLaunch}
            disabled={isLaunching || !tool.is_active}
            className="flex-1"
            variant={isLTI13 ? "default" : "secondary"}
          >
            {isLTI13 ? (
              <Zap className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isLaunching ? "Launching..." : `Launch ${isLTI13 ? "1.3" : "1.1"} Tool`}
          </Button>
          
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LTIToolCard;
