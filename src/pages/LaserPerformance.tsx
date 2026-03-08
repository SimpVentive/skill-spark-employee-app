import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeatureIntro from '@/components/shared/FeatureIntro';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ClipboardList,
  Notebook,
  Radar,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import LaserKPIDashboard from '@/components/laser/LaserKPIDashboard';
import LaserPerformanceAlerts from '@/components/laser/LaserPerformanceAlerts';
import LaserMicroLearning from '@/components/laser/LaserMicroLearning';
import LaserActionTasks from '@/components/laser/LaserActionTasks';
import LaserLearningDiary from '@/components/laser/LaserLearningDiary';
import LaserSkillsMap from '@/components/laser/LaserSkillsMap';
import LaserSmartRecommendations from '@/components/laser/LaserSmartRecommendations';
import LaserManagerFeedback from '@/components/laser/LaserManagerFeedback';


const LaserPerformance = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6">
      <FeatureIntro
        icon={Activity}
        title="LASER Performance"
        subtitle="Learning & Application Specific to Employee Role"
        description="LASER is your personalised performance-learning system. It monitors your work KPIs (like output, rejection rate, downtime), detects when something is off, identifies the root cause, and assigns you targeted micro-learning to fix it. It's not a generic training catalog — it's learning that's directly tied to YOUR job performance."
        benefits={[
          "Real-time KPI monitoring linked to your daily work metrics",
          "Automatic root cause analysis when performance dips",
          "Short 3–5 minute micro-learning modules — not hour-long courses",
          "Workplace action tasks with checklists to apply what you learned",
          "Personal learning diary that tracks your improvement journey",
          "Skills map showing your growing capabilities over time",
        ]}
        tips={[
          "Check Alerts at the start of each shift — takes under a minute",
          "Complete micro-learning during natural work breaks (3–5 min each)",
          "Use Action Task checklists on your phone right on the shop floor",
          "Add personal reflections to your Learning Diary — it helps retention",
        ]}
        color="bg-amber-500/10 text-amber-600"
        defaultExpanded
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="dashboard" className="gap-1.5">
            <Activity className="h-4 w-4" /> KPI Dashboard
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-1.5">
            <AlertTriangle className="h-4 w-4" /> Alerts
          </TabsTrigger>
          <TabsTrigger value="learning" className="gap-1.5">
            <BookOpen className="h-4 w-4" /> Micro-Learning
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-1.5">
            <ClipboardList className="h-4 w-4" /> Action Tasks
          </TabsTrigger>
          <TabsTrigger value="diary" className="gap-1.5">
            <Notebook className="h-4 w-4" /> Learning Diary
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-1.5">
            <Radar className="h-4 w-4" /> Skills Map
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="gap-1.5">
            <Sparkles className="h-4 w-4" /> Recommendations
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-1.5">
            <MessageSquare className="h-4 w-4" /> Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" /> My KPI Performance
              </CardTitle>
              <CardDescription>
                Real-time snapshot of your operational performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserKPIDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Performance Alerts
              </CardTitle>
              <CardDescription>
                KPI deviations detected with root cause analysis and recommended actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserPerformanceAlerts
                onNavigateToLearning={() => setActiveTab('learning')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Targeted Micro-Learning
              </CardTitle>
              <CardDescription>
                Short learning modules linked to your performance improvement areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserMicroLearning />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" /> Workplace Action Tasks
              </CardTitle>
              <CardDescription>
                Apply your learning with guided workplace actions and checklists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserActionTasks />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Notebook className="h-5 w-5" /> Learning Diary
              </CardTitle>
              <CardDescription>
                Your personal improvement journal tracking learning and growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserLearningDiary />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="h-5 w-5" /> Skill Development Map
              </CardTitle>
              <CardDescription>
                Visual map of your capability development based on learning and performance outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserSkillsMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Smart Recommendations
              </CardTitle>
              <CardDescription>
                Proactive learning suggestions to prevent performance issues before they occur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserSmartRecommendations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Manager Feedback
              </CardTitle>
              <CardDescription>
                Coaching messages and action assignments from your supervisor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaserManagerFeedback />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default LaserPerformance;
