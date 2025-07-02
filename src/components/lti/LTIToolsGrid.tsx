
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LTIToolCard from "./LTIToolCard";
import { Skeleton } from "@/components/ui/skeleton";

const LTIToolsGrid = () => {
  const { data: tools = [], isLoading, error } = useQuery({
    queryKey: ['lti-tools'],
    queryFn: async () => {
      console.log('Fetching LTI tools...');
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
      
      if (error) {
        console.error('Error fetching LTI tools:', error);
        throw error;
      }
      
      console.log('Fetched LTI tools:', data);
      return data || [];
    }
  });

  if (error) {
    console.error('LTI Tools query error:', error);
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load LTI tools. Please try again.</p>
      </div>
    );
  }

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
