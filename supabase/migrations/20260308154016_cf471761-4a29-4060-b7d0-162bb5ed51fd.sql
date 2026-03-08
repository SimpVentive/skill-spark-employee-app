
-- Learning diary for employee journal entries
CREATE TABLE public.laser_learning_diary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entry_type text NOT NULL DEFAULT 'learning_completed',
  title text NOT NULL,
  description text,
  related_intervention_id uuid REFERENCES public.laser_assigned_interventions(id),
  related_kpi_id uuid REFERENCES public.laser_kpi_definitions(id),
  performance_improvement_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.laser_learning_diary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diary entries"
  ON public.laser_learning_diary FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Users can insert own diary entries"
  ON public.laser_learning_diary FOR INSERT
  TO authenticated
  WITH CHECK (employee_id = auth.uid());

-- Workplace action tasks
CREATE TABLE public.laser_action_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  intervention_id uuid REFERENCES public.laser_assigned_interventions(id),
  title text NOT NULL,
  description text,
  checklist jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  assigned_by uuid REFERENCES public.profiles(id),
  due_date timestamptz,
  completed_at timestamptz,
  supervisor_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.laser_action_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own action tasks"
  ON public.laser_action_tasks FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Users can update own action tasks"
  ON public.laser_action_tasks FOR UPDATE
  TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Admins can manage all action tasks"
  ON public.laser_action_tasks FOR ALL
  TO authenticated
  USING (public.is_admin());

-- Manager feedback messages
CREATE TABLE public.laser_manager_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  manager_id uuid NOT NULL REFERENCES public.profiles(id),
  message text NOT NULL,
  feedback_type text NOT NULL DEFAULT 'coaching',
  related_intervention_id uuid REFERENCES public.laser_assigned_interventions(id),
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.laser_manager_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback"
  ON public.laser_manager_feedback FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid() OR manager_id = auth.uid());

CREATE POLICY "Managers can insert feedback"
  ON public.laser_manager_feedback FOR INSERT
  TO authenticated
  WITH CHECK (manager_id = auth.uid());

-- RLS policies for existing LASER tables so employees can see their own data
CREATE POLICY "Employees can view own deviations"
  ON public.laser_deviations FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid() OR public.is_admin());

CREATE POLICY "Employees can view own interventions"
  ON public.laser_assigned_interventions FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid() OR public.is_admin());

CREATE POLICY "Employees can update own interventions"
  ON public.laser_assigned_interventions FOR UPDATE
  TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Employees can view own performance signals"
  ON public.laser_performance_signals FOR SELECT
  TO authenticated
  USING (employee_id = auth.uid() OR public.is_admin());

CREATE POLICY "Anyone authenticated can view KPI definitions"
  ON public.laser_kpi_definitions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone authenticated can view cause definitions"
  ON public.laser_cause_definitions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can view own RCA results"
  ON public.laser_rca_results FOR SELECT
  TO authenticated
  USING (
    deviation_id IN (
      SELECT id FROM public.laser_deviations WHERE employee_id = auth.uid()
    )
    OR public.is_admin()
  );

CREATE POLICY "Employees can view own impact validations"
  ON public.laser_impact_validations FOR SELECT
  TO authenticated
  USING (
    intervention_id IN (
      SELECT id FROM public.laser_assigned_interventions WHERE employee_id = auth.uid()
    )
    OR public.is_admin()
  );
