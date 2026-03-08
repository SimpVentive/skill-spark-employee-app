import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FeatureIntroProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  tips?: string[];
  color?: string;
  defaultExpanded?: boolean;
}

const FeatureIntro = ({
  icon: Icon,
  title,
  subtitle,
  description,
  benefits,
  tips,
  color = 'bg-primary/10 text-primary',
  defaultExpanded = false,
}: FeatureIntroProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-xl border bg-gradient-to-r from-muted/40 to-background overflow-hidden">
      {/* Always visible header */}
      <div
        className="flex items-start gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`p-2.5 rounded-xl ${color} shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold">{title}</h2>
            <Badge variant="outline" className="text-xs font-normal">{subtitle}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{description}</p>
        </div>
        <Button variant="ghost" size="sm" className="shrink-0 mt-0.5">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 space-y-4 border-t bg-muted/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {tips && tips.length > 0 && (
            <div className="bg-background rounded-lg border p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                <Lightbulb className="h-3.5 w-3.5" /> Quick Tips
              </div>
              <ul className="space-y-1">
                {tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-500">💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeatureIntro;
