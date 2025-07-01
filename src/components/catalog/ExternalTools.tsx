
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import LTIToolsGrid from "@/components/lti/LTIToolsGrid";

const ExternalTools = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            <CardTitle>External Learning Tools</CardTitle>
          </div>
          <CardDescription>
            Access external learning platforms and tools integrated via Learning Tools Interoperability (LTI)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LTIToolsGrid />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExternalTools;
