
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings, Trash2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LTIAdminPanel = () => {
  const { data: providers = [], isLoading: loadingProviders } = useQuery({
    queryKey: ['lti-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lti_providers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: tools = [], isLoading: loadingTools } = useQuery({
    queryKey: ['lti-tools-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lti_tools')
        .select(`
          *,
          lti_providers (name, lti_version)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">LTI Administration</h2>
          <p className="text-muted-foreground">
            Manage Learning Tools Interoperability providers and tools
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Tabs defaultValue="providers" className="w-full">
        <TabsList>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="launches">Launch History</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          {loadingProviders ? (
            <div>Loading providers...</div>
          ) : (
            <div className="grid gap-4">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>
                          {provider.lti_version} • {provider.privacy_level}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={provider.is_active ? "default" : "secondary"}>
                          {provider.is_active ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {provider.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {provider.platform_id && (
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Platform ID: {provider.platform_id}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          {loadingTools ? (
            <div>Loading tools...</div>
          ) : (
            <div className="grid gap-4">
              {tools.map((tool) => (
                <Card key={tool.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>
                          {tool.lti_providers?.name} • {tool.category}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={tool.is_active ? "default" : "secondary"}>
                          {tool.is_active ? "Active" : "Inactive"}
                        </Badge>
                        {tool.grade_passback_enabled && (
                          <Badge variant="outline">Grade Passback</Badge>
                        )}
                        {tool.deep_linking_enabled && (
                          <Badge variant="outline">Deep Linking</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <div>Launch URL: {tool.launch_url}</div>
                      {tool.description && <div className="mt-1">{tool.description}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="launches">
          <Card>
            <CardHeader>
              <CardTitle>Launch History</CardTitle>
              <CardDescription>
                Recent LTI tool launches and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Launch history will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LTIAdminPanel;
