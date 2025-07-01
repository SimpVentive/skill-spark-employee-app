
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LTIToolCard from "./LTIToolCard";
import { Skeleton } from "@/components/ui/skeleton";

const LTIToolsGrid = () => {
  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['lti-tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lti_tools')
        .select(`
          *,
          lti_providers (
            name,
            lti_version
          )
        `)
        .eq('is_active', true);
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No LTI tools configured yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <LTIToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};

export default LTIToolsGrid;
