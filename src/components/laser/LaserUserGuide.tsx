import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ClipboardList,
  Notebook,
  Radar,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Zap,
  RefreshCw,
} from 'lucide-react';

const steps = [
  {
    icon: Activity,
    title: 'Check Your KPI Dashboard',
    description:
      'Start by reviewing your KPI performance indicators. See your output vs target, rejection rates, machine downtime, and more — all in real time.',
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    icon: AlertTriangle,
    title: 'Review Performance Alerts',
    description:
      'When the system detects a KPI deviation, you\'ll get an alert with the possible root cause and a recommended learning action. For example: "Rejection rate increased — possible cause: machine setup variation."',
    color: 'text-orange-500 bg-orange-500/10',
  },
  {
    icon: BookOpen,
    title: 'Complete Micro-Learning Modules',
    description:
      'Short 3–5 minute learning modules are assigned based on your specific performance gaps. These include videos, simulations, checklists, and visual job aids — all immediately applicable to your work.',
    color: 'text-purple-500 bg-purple-500/10',
  },
  {
    icon: ClipboardList,
    title: 'Do Your Workplace Action Tasks',
    description:
      'After completing a learning module, you\'ll receive a workplace action task. For example: "During your next shift, verify machine calibration and record setup parameters using the checklist." Tick off items as you go.',
    color: 'text-green-500 bg-green-500/10',
  },
  {
    icon: Notebook,
    title: 'Track Progress in Your Learning Diary',
    description:
      'Your diary automatically logs completed learning modules, finished action tasks, and observed performance improvements. You can also add personal reflections and notes.',
    color: 'text-yellow-500 bg-yellow-500/10',
  },
  {
    icon: Radar,
    title: 'Grow Your Skills Map',
    description:
      'See a visual map of your capabilities — machine setup, process control, maintenance discipline, quality inspection, and more. Each skill shows your proficiency level based on learning and outcomes.',
    color: 'text-cyan-500 bg-cyan-500/10',
  },
  {
    icon: Sparkles,
    title: 'Act on Smart Recommendations',
    description:
      'The system proactively suggests learning based on upcoming production changes, seasonal risks, or frequently occurring errors — helping you prevent issues before they happen.',
    color: 'text-pink-500 bg-pink-500/10',
  },
  {
    icon: MessageSquare,
    title: 'Read Manager Feedback',
    description:
      'Your manager can send coaching messages, suggest specific learning modules, or assign action tasks. Check this section regularly to stay aligned with your team\'s goals.',
    color: 'text-indigo-500 bg-indigo-500/10',
  },
];

const LaserUserGuide = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Hero section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
          <Zap className="h-4 w-4" /> LASER Quick Start Guide
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Your Performance Learning Assistant
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          LASER connects your daily work performance directly to personalized learning.
          Instead of browsing generic courses, you get exactly what you need to improve.
        </p>
      </div>

      {/* The Loop */}
      <Card className="bg-muted/30">
        <CardContent className="py-6">
          <h3 className="font-semibold text-center mb-4">How LASER Works</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {['Work Signal', 'Insight', 'Learning', 'Action', 'Improvement'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <Badge variant="secondary" className="font-medium px-3 py-1">{step}</Badge>
                {i < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1">Continuous improvement cycle</p>
        </CardContent>
      </Card>

      {/* Step by step */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Step-by-Step Guide</h2>
        {steps.map((step, index) => (
          <Card key={index} className="hover:shadow-sm transition-shadow">
            <CardContent className="py-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-lg font-bold text-muted-foreground w-6 text-right">{index + 1}</span>
                  <div className={`p-2.5 rounded-lg ${step.color}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">💡 Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Check your alerts at the start of each shift — they take less than a minute to review.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Micro-learning modules are designed to be 3–5 minutes. Complete them during natural breaks.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Action tasks are meant to be done on the shop floor — use the checklist feature on your phone.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Add personal notes to your diary — reflecting on what you learned helps it stick.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Watch your Skills Map grow over time — it's your professional development record.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
        {[
          {
            q: 'Who assigns my learning modules?',
            a: 'The system automatically assigns modules based on your KPI performance. Your manager can also assign specific tasks.',
          },
          {
            q: 'Can I add my own notes?',
            a: 'Yes! Go to the Learning Diary tab and click "Add Entry" to record reflections, observations, or improvement ideas.',
          },
          {
            q: 'What happens when I complete a module?',
            a: 'It\'s recorded in your diary, updates your Skills Map, and you may receive a workplace action task to apply what you learned.',
          },
          {
            q: 'Can my manager see my progress?',
            a: 'Yes, managers can see your learning progress and KPI improvements. They can also send coaching feedback directly through the system.',
          },
          {
            q: 'How are KPIs tracked?',
            a: 'KPI data is pulled from your operational systems (production, quality, maintenance, etc.). You don\'t need to enter anything manually.',
          },
        ].map((faq, i) => (
          <Card key={i}>
            <CardContent className="py-3">
              <h4 className="font-medium text-sm">{faq.q}</h4>
              <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LaserUserGuide;
