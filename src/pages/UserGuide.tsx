import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  Search,
  Route,
  FileText,
  Calendar,
  Download,
  Bookmark,
  Trophy,
  Users,
  BarChart3,
  Award,
  Zap,
  Bell,
  LogOut,
  ChevronRight,
  MousePointer,
  Eye,
  CheckCircle,
  ArrowRight,
  MapPin,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Monitor,
  Smartphone,
  Star,
  Activity,
  AlertTriangle,
  ClipboardList,
  Notebook,
  Radar,
  Sparkles,
  MessageSquare,
  Play,
  Target,
} from 'lucide-react';

// Visual step component with numbered badge and pointer graphic
const GuideStep = ({ step, title, description, action, icon: Icon, highlight }: {
  step: number;
  title: string;
  description: string;
  action?: string;
  icon: any;
  highlight?: string;
}) => (
  <div className="flex gap-4 items-start group">
    <div className="flex flex-col items-center shrink-0">
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
        {step}
      </div>
      <div className="w-px h-full bg-border mt-2 group-last:hidden" />
    </div>
    <Card className="flex-1 mb-4 hover:shadow-md transition-shadow border-l-4 border-l-primary/30">
      <CardContent className="py-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {action && (
              <div className="flex items-center gap-2 mt-2 bg-muted/50 rounded-lg px-3 py-2">
                <MousePointer className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-primary">{action}</span>
              </div>
            )}
            {highlight && (
              <Badge variant="secondary" className="mt-1">{highlight}</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Feature card for the overview grid
const FeatureCard = ({ title, description, icon: Icon, color, href }: {
  title: string;
  description: string;
  icon: any;
  color: string;
  href: string;
}) => (
  <Link to={href}>
    <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
      <CardContent className="py-5">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl ${color} shrink-0 group-hover:scale-110 transition-transform`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Go to {title} <ChevronRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

const UserGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarFeatures = [
    { title: 'Dashboard', description: 'Your learning hub with quick stats, upcoming deadlines, and recent activity', icon: Home, color: 'bg-blue-500/10 text-blue-600', href: '/dashboard' },
    { title: 'LASER Performance', description: 'KPI tracking, performance alerts, micro-learning, and action tasks', icon: Zap, color: 'bg-amber-500/10 text-amber-600', href: '/laser-performance' },
    { title: 'Course Catalog', description: 'Browse and enrol in available training courses and programs', icon: Search, color: 'bg-purple-500/10 text-purple-600', href: '/course-catalog' },
    { title: 'Learning Paths', description: 'Structured learning journeys with sequential modules', icon: Route, color: 'bg-green-500/10 text-green-600', href: '/learning-paths' },
    { title: 'Assessments', description: 'Take quizzes, tests, and evaluations for your courses', icon: FileText, color: 'bg-red-500/10 text-red-600', href: '/assessments' },
    { title: 'Calendar', description: 'View upcoming training sessions, deadlines, and events', icon: Calendar, color: 'bg-cyan-500/10 text-cyan-600', href: '/calendar' },
    { title: 'Offline Content', description: 'Download materials for offline access on-the-go', icon: Download, color: 'bg-teal-500/10 text-teal-600', href: '/offline-content' },
    { title: 'Bookmarks', description: 'Save and organize your favourite learning content', icon: Bookmark, color: 'bg-orange-500/10 text-orange-600', href: '/bookmarks' },
    { title: 'Achievements', description: 'View earned badges, milestones, and rewards', icon: Trophy, color: 'bg-yellow-500/10 text-yellow-600', href: '/achievements' },
    { title: 'Social Learning', description: 'Collaborate with peers, join discussions, and share insights', icon: Users, color: 'bg-pink-500/10 text-pink-600', href: '/social-learning' },
    { title: 'Analytics', description: 'Track your learning progress, time spent, and completion rates', icon: BarChart3, color: 'bg-indigo-500/10 text-indigo-600', href: '/analytics' },
    { title: 'Certifications', description: 'Manage and track professional certifications', icon: Award, color: 'bg-emerald-500/10 text-emerald-600', href: '/certifications' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12">
        <div className="absolute top-4 right-4 opacity-10">
          <HelpCircle className="h-32 w-32" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="mb-3">📖 User Guide</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Welcome to SkillSpark
          </h1>
          <p className="text-lg text-muted-foreground">
            Your complete learning and performance portal. This guide walks you through every feature — 
            what it does, where to find it, and how to use it.
          </p>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="gap-1.5">
            <Eye className="h-4 w-4" /> Portal Overview
          </TabsTrigger>
          <TabsTrigger value="getting-started" className="gap-1.5">
            <Play className="h-4 w-4" /> Getting Started
          </TabsTrigger>
          <TabsTrigger value="features" className="gap-1.5">
            <Star className="h-4 w-4" /> Feature Guide
          </TabsTrigger>
          <TabsTrigger value="laser" className="gap-1.5">
            <Zap className="h-4 w-4" /> LASER Guide
          </TabsTrigger>
          <TabsTrigger value="tips" className="gap-1.5">
            <Lightbulb className="h-4 w-4" /> Tips & FAQ
          </TabsTrigger>
        </TabsList>

        {/* ===== PORTAL OVERVIEW ===== */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Navigation map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Portal Navigation Map
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Click any feature card below to go directly to that section. All features are also accessible from the <strong>left sidebar</strong>.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sidebarFeatures.map((feature) => (
                  <FeatureCard key={feature.title} {...feature} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Layout explanation */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding the Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-xl p-4 space-y-2 bg-sidebar/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-16 rounded bg-primary/30" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm">Left Sidebar</h4>
                      <p className="text-xs text-muted-foreground">Main navigation menu. Click any item to switch between features.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
                    <MousePointer className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium">Click sidebar items to navigate</span>
                  </div>
                </div>

                <div className="border rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-full h-3 rounded bg-muted" />
                  </div>
                  <h4 className="font-semibold text-sm">Top Header Bar</h4>
                  <p className="text-xs text-muted-foreground">Shows your email, notification bell 🔔, and sign out button.</p>
                  <div className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1.5">
                    <MousePointer className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium">Click 🔔 for notification settings</span>
                  </div>
                </div>

                <div className="border rounded-xl p-4 space-y-2 bg-background">
                  <div className="w-full h-16 rounded bg-muted/30 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Page Content Area</span>
                  </div>
                  <h4 className="font-semibold text-sm">Main Content</h4>
                  <p className="text-xs text-muted-foreground">The selected feature's content displays here. Scroll down to see everything.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== GETTING STARTED ===== */}
        <TabsContent value="getting-started" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" /> Your First Steps
              </CardTitle>
              <p className="text-sm text-muted-foreground">Follow these steps to get up and running on the portal</p>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl">
                <GuideStep
                  step={1}
                  title="Log In to Your Account"
                  description="Open the portal URL in your browser. Enter your email and password on the login screen."
                  action="Click 'Sign In' button on the login page"
                  icon={LogOut}
                />
                <GuideStep
                  step={2}
                  title="Explore the Dashboard"
                  description="After login, you land on the Dashboard. This shows your learning summary, upcoming deadlines, and recent courses."
                  action="Click 'Dashboard' in the left sidebar"
                  icon={Home}
                  highlight="This is your home base"
                />
                <GuideStep
                  step={3}
                  title="Check Your LASER Performance"
                  description="See your KPI performance, any alerts, and assigned micro-learning. This is where work performance connects to learning."
                  action="Click '⚡ LASER Performance' in the left sidebar"
                  icon={Zap}
                  highlight="Priority feature for operational staff"
                />
                <GuideStep
                  step={4}
                  title="Browse Available Courses"
                  description="Explore the course catalog to find training programs. You can filter by category, difficulty, and duration."
                  action="Click 'Course Catalog' in the left sidebar"
                  icon={Search}
                />
                <GuideStep
                  step={5}
                  title="Follow a Learning Path"
                  description="Learning paths are structured course sequences. Enrol in a path and progress through modules step by step."
                  action="Click 'Learning Paths' in the left sidebar"
                  icon={Route}
                />
                <GuideStep
                  step={6}
                  title="Take Assessments"
                  description="Complete quizzes and tests tied to your courses. Your scores and attempts are tracked."
                  action="Click 'Assessments' in the left sidebar"
                  icon={FileText}
                />
                <GuideStep
                  step={7}
                  title="Track Your Progress"
                  description="View your learning analytics — completion rates, time spent, skill development, and more."
                  action="Click 'Analytics' in the left sidebar"
                  icon={BarChart3}
                />
                <GuideStep
                  step={8}
                  title="Set Notification Preferences"
                  description="Control which notifications you receive — reminders, alerts, deadlines, and more."
                  action="Click '🔔' icon in the top header bar"
                  icon={Bell}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== FEATURE GUIDE ===== */}
        <TabsContent value="features" className="mt-6 space-y-4">
          {[
            {
              icon: Home, title: 'Dashboard', color: 'bg-blue-500/10 text-blue-600',
              where: 'Left sidebar → "Dashboard"',
              what: 'Your learning home page. Shows a summary of enrolled courses, upcoming deadlines, recent activity, and quick-access links.',
              howTo: [
                'View your overall learning progress at a glance',
                'See upcoming deadlines and calendar events',
                'Jump to recently accessed courses',
                'Check motivational messages and achievements',
              ],
            },
            {
              icon: Search, title: 'Course Catalog', color: 'bg-purple-500/10 text-purple-600',
              where: 'Left sidebar → "Course Catalog"',
              what: 'Browse all available training courses and programs. Search by name, filter by category or difficulty level.',
              howTo: [
                'Use the search bar at the top to find specific courses',
                'Filter courses by category, level, or duration',
                'Click a course card to see details and enrol',
                'Bookmark courses for later using the save icon',
              ],
            },
            {
              icon: Route, title: 'Learning Paths', color: 'bg-green-500/10 text-green-600',
              where: 'Left sidebar → "Learning Paths"',
              what: 'Structured learning journeys — a sequence of courses/modules designed to build skills progressively.',
              howTo: [
                'Browse available learning paths',
                'Click to see the path structure and modules',
                'Enrol and complete modules in order',
                'Track your progress through the path',
              ],
            },
            {
              icon: FileText, title: 'Assessments', color: 'bg-red-500/10 text-red-600',
              where: 'Left sidebar → "Assessments"',
              what: 'Take quizzes, tests, and evaluations for your enrolled courses. Timed or untimed, with score tracking.',
              howTo: [
                'View available assessments and their due dates',
                'Click "Start" to begin an assessment',
                'Answer questions within the time limit (if applicable)',
                'View your results and review answers after submission',
              ],
            },
            {
              icon: Calendar, title: 'Calendar', color: 'bg-cyan-500/10 text-cyan-600',
              where: 'Left sidebar → "Calendar"',
              what: 'See all your training sessions, deadlines, and events in a calendar view. Sync with external calendars.',
              howTo: [
                'Switch between month, week, and day views',
                'Click an event to see details',
                'Sync with Google Calendar or Outlook if enabled',
                'Upcoming events appear on your Dashboard too',
              ],
            },
            {
              icon: Download, title: 'Offline Content', color: 'bg-teal-500/10 text-teal-600',
              where: 'Left sidebar → "Offline Content"',
              what: 'Download course materials for offline access — PDFs, videos, and documents available without internet.',
              howTo: [
                'Browse available downloadable materials',
                'Click the download button to save to your device',
                'Access downloaded content even without internet',
                'Great for shop floor or travel use',
              ],
            },
            {
              icon: Bookmark, title: 'Bookmarks', color: 'bg-orange-500/10 text-orange-600',
              where: 'Left sidebar → "Bookmarks"',
              what: 'Your saved courses, modules, and resources. Organised by type — courses, resources, notes.',
              howTo: [
                'Click the bookmark icon on any content to save it',
                'Filter bookmarks by type (courses, resources, notes)',
                'Click "Continue" to resume a bookmarked course',
                'Remove bookmarks you no longer need',
              ],
            },
            {
              icon: Trophy, title: 'Achievements', color: 'bg-yellow-500/10 text-yellow-600',
              where: 'Left sidebar → "Achievements"',
              what: 'View your earned badges, milestones, and gamification rewards. Track your streak and progress.',
              howTo: [
                'See all earned badges and when you got them',
                'Track your learning streak',
                'View upcoming achievements you can unlock',
                'Share achievements with your manager or peers',
              ],
            },
            {
              icon: Users, title: 'Social Learning', color: 'bg-pink-500/10 text-pink-600',
              where: 'Left sidebar → "Social Learning"',
              what: 'Collaborate with colleagues — join discussions, share learning resources, and participate in group activities.',
              howTo: [
                'Join discussion threads on course topics',
                'Share useful resources with your peers',
                'Ask questions and get answers from colleagues',
                'Participate in collaborative learning activities',
              ],
            },
            {
              icon: BarChart3, title: 'Analytics', color: 'bg-indigo-500/10 text-indigo-600',
              where: 'Left sidebar → "Analytics"',
              what: 'Track your learning metrics — completion rates, time spent, assessment scores, and skill development.',
              howTo: [
                'View your overall completion percentage',
                'See time spent on learning per week/month',
                'Track assessment scores and improvement trends',
                'Export your learning data if needed',
              ],
            },
            {
              icon: Award, title: 'Certifications', color: 'bg-emerald-500/10 text-emerald-600',
              where: 'Left sidebar → "Certifications"',
              what: 'Manage professional certifications — track expiry dates, prerequisites, and renewal requirements.',
              howTo: [
                'View all available certifications',
                'See prerequisites and eligibility',
                'Track your certification expiry dates',
                'Start a certification journey from here',
              ],
            },
          ].map((feature) => (
            <Card key={feature.title} className="hover:shadow-sm transition-shadow">
              <CardContent className="py-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${feature.color} shrink-0`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.what}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 w-fit">
                      <MousePointer className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{feature.where}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {feature.howTo.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ===== LASER GUIDE ===== */}
        <TabsContent value="laser" className="mt-6 space-y-6">
          <Card className="bg-amber-500/5 border-amber-200/50">
            <CardContent className="py-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">LASER Performance System</h3>
                  <p className="text-sm text-muted-foreground">Learning & Application Specific to Employee Role</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                LASER connects your daily work KPIs directly to personalised learning. Instead of browsing generic courses, 
                you get exactly what you need based on your actual performance data.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm bg-background rounded-lg p-3 border">
                {['Work Signal', 'Insight', 'Learning', 'Action', 'Improvement'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-medium">{step}</Badge>
                    {i < 4 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="max-w-2xl">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              How to use each LASER tab
            </h3>
            <GuideStep
              step={1}
              title="KPI Dashboard"
              description="See your key performance indicators at a glance — output vs target, rejection rates, downtime, etc. Green means on track, red means needs attention."
              action="Click 'LASER Performance' → 'KPI Dashboard' tab"
              icon={Activity}
            />
            <GuideStep
              step={2}
              title="Performance Alerts"
              description="When a KPI drops below target, you get an alert explaining the possible root cause and recommending a specific learning module. Example: 'Rejection rate increased — possible cause: machine setup variation.'"
              action="Click 'Alerts' tab to see active alerts"
              icon={AlertTriangle}
              highlight="Click 'Start Learning' on any alert to begin the recommended module"
            />
            <GuideStep
              step={3}
              title="Micro-Learning Modules"
              description="Short 3–5 minute modules assigned based on your performance gaps. Includes videos, simulations, checklists, and job aids. Click 'Start' to begin, then 'Complete' when finished."
              action="Click 'Micro-Learning' tab → Click 'Start' on any module"
              icon={BookOpen}
            />
            <GuideStep
              step={4}
              title="Workplace Action Tasks"
              description="After completing a learning module, you'll get a workplace task with a checklist. Example: 'During your next shift, verify machine calibration.' Tick items off as you complete them."
              action="Click 'Action Tasks' tab → Check off items as you do them"
              icon={ClipboardList}
              highlight="Tasks auto-complete when all checklist items are done"
            />
            <GuideStep
              step={5}
              title="Learning Diary"
              description="An automatic journal of your learning journey. Completed modules and tasks are logged automatically. You can also add personal reflections and notes."
              action="Click 'Learning Diary' tab → Click 'Add Entry' for personal notes"
              icon={Notebook}
            />
            <GuideStep
              step={6}
              title="Skills Map"
              description="A visual map of your developing capabilities. Each skill shows a proficiency level (Beginner → Expert) based on completed learning and measured performance outcomes."
              action="Click 'Skills Map' tab to see your progress"
              icon={Radar}
            />
            <GuideStep
              step={7}
              title="Smart Recommendations"
              description="Proactive learning suggestions based on upcoming production changes, seasonal risks, or common errors. These help you prevent problems before they happen."
              action="Click 'Recommendations' tab"
              icon={Sparkles}
            />
            <GuideStep
              step={8}
              title="Manager Feedback"
              description="Your manager can send coaching messages, suggest learning modules, or assign tasks. Unread messages are marked 'New'. Check regularly to stay aligned."
              action="Click 'Feedback' tab to view messages"
              icon={MessageSquare}
            />
          </div>
        </TabsContent>

        {/* ===== TIPS & FAQ ===== */}
        <TabsContent value="tips" className="mt-6 space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-5 w-5" /> Top Tips for Getting the Most Out of SkillSpark
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { tip: 'Check LASER Alerts at the start of each shift', detail: 'Takes less than a minute — helps you stay ahead of KPI issues' },
                  { tip: 'Do micro-learning during natural breaks', detail: 'Modules are 3–5 minutes — perfect for break times' },
                  { tip: 'Use Action Task checklists on your phone', detail: 'Tick off items on the shop floor as you complete them' },
                  { tip: 'Bookmark content for quick access later', detail: 'Click the save icon on any course or resource' },
                  { tip: 'Write diary notes regularly', detail: 'Personal reflections help learning stick — even a few words help' },
                  { tip: 'Check your Analytics weekly', detail: 'Track your progress and identify areas to focus on' },
                  { tip: 'Download content for offline access', detail: 'Use the Offline Content section before travelling or going to areas without WiFi' },
                  { tip: 'Engage in Social Learning', detail: 'Ask and answer questions — teaching others reinforces your own learning' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-background rounded-lg p-3 border">
                    <Star className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0 fill-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">{item.tip}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">❓ Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { q: 'Where do I find my enrolled courses?', a: 'Go to Dashboard — your enrolled courses are listed there. You can also check Course Catalog to enrol in new ones.' },
                { q: 'How do I know if I have a performance alert?', a: 'Click "LASER Performance" in the sidebar, then the "Alerts" tab. Alerts appear when a KPI deviation is detected.' },
                { q: 'Who assigns my learning modules?', a: 'LASER assigns them automatically based on your KPI data. Your manager can also assign specific tasks.' },
                { q: 'Can my manager see my progress?', a: 'Yes — managers can view your learning progress, KPI improvements, and send coaching feedback.' },
                { q: 'How do I download content for offline use?', a: 'Click "Offline Content" in the sidebar. Click the download icon next to any available material.' },
                { q: 'What happens when I complete a micro-learning module?', a: 'It\'s logged in your diary, updates your Skills Map, and you may receive a workplace action task to apply what you learned.' },
                { q: 'How do I change my notification settings?', a: 'Click the 🔔 bell icon in the top-right header, or go to "Notifications" at the bottom of the sidebar.' },
                { q: 'Where can I see my certifications?', a: 'Click "Certifications" in the sidebar to view, track, and manage all your professional certifications.' },
                { q: 'Can I access the portal on my phone?', a: 'Yes! The portal is mobile-friendly. Open it in your phone browser for full access including micro-learning and action task checklists.' },
                { q: 'How are my KPIs tracked?', a: 'KPI data is pulled from your operational systems (production, quality, maintenance, etc). You don\'t need to enter anything manually.' },
              ].map((faq, i) => (
                <div key={i} className="border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                  <h4 className="font-medium text-sm">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserGuide;
