
-- First, let's create the programs table and related structures
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  program_type TEXT NOT NULL CHECK (program_type IN ('tna', 'mandatory', 'self-directed', 'eligible')),
  level TEXT NOT NULL CHECK (level IN ('Basic', 'Intermediate', 'Advanced')),
  theme TEXT,
  outline TEXT NOT NULL,
  venue TEXT,
  multiple_batches BOOLEAN DEFAULT false,
  faculty TEXT,
  pre_test_info TEXT,
  pre_read_info TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create program sessions table for scheduling
CREATE TABLE IF NOT EXISTS public.program_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user program enrollments table
CREATE TABLE IF NOT EXISTS public.user_program_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.program_sessions(id) ON DELETE CASCADE,
  enrollment_type TEXT NOT NULL CHECK (enrollment_type IN ('nominated', 'self-enrolled', 'requested')),
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'confirmed', 'declined', 'completed', 'in-progress')),
  attendance_confirmed BOOLEAN DEFAULT false,
  date_change_requested BOOLEAN DEFAULT false,
  requested_session_id UUID REFERENCES public.program_sessions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user learning progress table
CREATE TABLE IF NOT EXISTS public.user_learning_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('ilt', 'elearning', 'peer-to-peer')),
  hours_completed DECIMAL(10,2) DEFAULT 0,
  total_hours DECIMAL(10,2) DEFAULT 0,
  progress_percentage INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_program_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for programs (readable by all authenticated users)
CREATE POLICY "Programs are viewable by authenticated users" ON public.programs
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for program sessions (readable by all authenticated users)
CREATE POLICY "Program sessions are viewable by authenticated users" ON public.program_sessions
  FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for user enrollments (users can only see their own)
CREATE POLICY "Users can view their own enrollments" ON public.user_program_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON public.user_program_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" ON public.user_program_enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for learning progress (users can only see their own)
CREATE POLICY "Users can view their own learning progress" ON public.user_learning_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning progress" ON public.user_learning_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning progress" ON public.user_learning_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample data for programs
INSERT INTO public.programs (title, program_type, level, theme, outline, venue, multiple_batches, faculty, pre_test_info, pre_read_info, icon) VALUES
('Advanced Leadership Development', 'tna', 'Advanced', 'Leadership', 'Comprehensive leadership program covering strategic thinking, team management, and organizational development skills for senior executives.', 'Corporate Training Center', true, 'Dr. Sarah Johnson', 'Leadership assessment questionnaire - Opens 1 week before program', 'Harvard Business Review Leadership Essentials - Available in library', '👑'),
('GXP Compliance Training', 'mandatory', 'Basic', 'Compliance', 'Essential training on Good Practice guidelines covering documentation, quality systems, and regulatory compliance requirements.', 'Online eLearning', false, 'John Smith, Compliance Expert', 'Basic compliance quiz - Opens 3 days before', 'GXP Guidelines Document v3.2 - Available on portal', '📋'),
('Digital Marketing Fundamentals', 'self-directed', 'Intermediate', 'Marketing', 'Complete guide to digital marketing including SEO, social media, content marketing, and analytics for modern businesses.', 'Online eLearning', true, 'Maria Rodriguez', 'None', 'Digital Marketing Trends 2024 Report', '📱'),
('Project Management Certification Prep', 'eligible', 'Advanced', 'Management', 'Comprehensive preparation for PMP certification covering all knowledge areas and process groups as per PMI standards.', 'Training Room B', true, 'Prof. Michael Chen', 'PMP eligibility verification required', 'PMBOK Guide 7th Edition', '📊');

-- Insert sample program sessions
INSERT INTO public.program_sessions (program_id, start_date, end_date, max_participants) VALUES
((SELECT id FROM public.programs WHERE title = 'Advanced Leadership Development'), '2025-02-15', '2025-02-17', 20),
((SELECT id FROM public.programs WHERE title = 'Advanced Leadership Development'), '2025-03-15', '2025-03-17', 20),
((SELECT id FROM public.programs WHERE title = 'GXP Compliance Training'), '2025-02-01', '2025-02-01', 50),
((SELECT id FROM public.programs WHERE title = 'Project Management Certification Prep'), '2025-02-20', '2025-02-25', 15),
((SELECT id FROM public.programs WHERE title = 'Project Management Certification Prep'), '2025-03-20', '2025-03-25', 15);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.user_program_enrollments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
