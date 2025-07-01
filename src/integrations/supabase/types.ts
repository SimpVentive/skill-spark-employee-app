export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: {
          assessment_type: string
          created_at: string | null
          due_date: string | null
          id: string
          max_attempts: number | null
          passing_score: number
          program_id: string | null
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          assessment_type: string
          created_at?: string | null
          due_date?: string | null
          id?: string
          max_attempts?: number | null
          passing_score: number
          program_id?: string | null
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          assessment_type?: string
          created_at?: string | null
          due_date?: string | null
          id?: string
          max_attempts?: number | null
          passing_score?: number
          program_id?: string | null
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          issuer: string
          level: string
          max_attempts: number | null
          passing_score: number | null
          prerequisites: string[] | null
          price: number | null
          skills_covered: string[] | null
          title: string
          updated_at: string
          validity_months: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          issuer: string
          level: string
          max_attempts?: number | null
          passing_score?: number | null
          prerequisites?: string[] | null
          price?: number | null
          skills_covered?: string[] | null
          title: string
          updated_at?: string
          validity_months?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          issuer?: string
          level?: string
          max_attempts?: number | null
          passing_score?: number | null
          prerequisites?: string[] | null
          price?: number | null
          skills_covered?: string[] | null
          title?: string
          updated_at?: string
          validity_months?: number | null
        }
        Relationships: []
      }
      learning_path_modules: {
        Row: {
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          is_required: boolean | null
          learning_path_id: string
          order_index: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          is_required?: boolean | null
          learning_path_id: string
          order_index: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          is_required?: boolean | null
          learning_path_id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_modules_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          level: string
          title: string
          total_duration_hours: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level: string
          title: string
          total_duration_hours?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: string
          title?: string
          total_duration_hours?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          manager_id: string | null
          position: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          manager_id?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          manager_id?: string | null
          position?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      program_sessions: {
        Row: {
          created_at: string | null
          current_participants: number | null
          end_date: string
          id: string
          max_participants: number | null
          program_id: string
          start_date: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          current_participants?: number | null
          end_date: string
          id?: string
          max_participants?: number | null
          program_id: string
          start_date: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          current_participants?: number | null
          end_date?: string
          id?: string
          max_participants?: number | null
          program_id?: string
          start_date?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "program_sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string | null
          faculty: string | null
          icon: string | null
          id: string
          level: string
          multiple_batches: boolean | null
          outline: string
          pre_read_info: string | null
          pre_test_info: string | null
          program_type: string
          theme: string | null
          title: string
          updated_at: string | null
          venue: string | null
        }
        Insert: {
          created_at?: string | null
          faculty?: string | null
          icon?: string | null
          id?: string
          level: string
          multiple_batches?: boolean | null
          outline: string
          pre_read_info?: string | null
          pre_test_info?: string | null
          program_type: string
          theme?: string | null
          title: string
          updated_at?: string | null
          venue?: string | null
        }
        Update: {
          created_at?: string | null
          faculty?: string | null
          icon?: string | null
          id?: string
          level?: string
          multiple_batches?: boolean | null
          outline?: string
          pre_read_info?: string | null
          pre_test_info?: string | null
          program_type?: string
          theme?: string | null
          title?: string
          updated_at?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      user_assessment_attempts: {
        Row: {
          assessment_id: string
          attempt_number: number
          completed_at: string | null
          created_at: string | null
          id: string
          score: number | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          assessment_id: string
          attempt_number: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          assessment_id?: string
          attempt_number?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_certification_attempts: {
        Row: {
          attempt_number: number
          certification_id: string
          completed_at: string | null
          created_at: string
          id: string
          passed: boolean | null
          score: number | null
          started_at: string
          status: string | null
          user_id: string
        }
        Insert: {
          attempt_number: number
          certification_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          status?: string | null
          user_id: string
        }
        Update: {
          attempt_number?: number
          certification_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_certification_attempts_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_certifications: {
        Row: {
          certificate_url: string | null
          certification_id: string
          created_at: string
          credential_id: string
          earned_date: string
          expiry_date: string | null
          id: string
          score: number | null
          status: string | null
          user_id: string
          verification_url: string | null
        }
        Insert: {
          certificate_url?: string | null
          certification_id: string
          created_at?: string
          credential_id: string
          earned_date: string
          expiry_date?: string | null
          id?: string
          score?: number | null
          status?: string | null
          user_id: string
          verification_url?: string | null
        }
        Update: {
          certificate_url?: string | null
          certification_id?: string
          created_at?: string
          credential_id?: string
          earned_date?: string
          expiry_date?: string | null
          id?: string
          score?: number | null
          status?: string | null
          user_id?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_learning_path_enrollments: {
        Row: {
          completed_at: string | null
          enrolled_at: string
          id: string
          learning_path_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          enrolled_at?: string
          id?: string
          learning_path_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          enrolled_at?: string
          id?: string
          learning_path_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_path_enrollments_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_module_progress: {
        Row: {
          completed_at: string | null
          id: string
          learning_path_id: string
          module_id: string
          status: string | null
          time_spent_hours: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          learning_path_id: string
          module_id: string
          status?: string | null
          time_spent_hours?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          learning_path_id?: string
          module_id?: string
          status?: string | null
          time_spent_hours?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_module_progress_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_path_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_program_enrollments: {
        Row: {
          attendance_confirmed: boolean | null
          completed_at: string | null
          date_change_requested: boolean | null
          enrolled_at: string | null
          enrollment_type: string
          id: string
          program_id: string
          requested_session_id: string | null
          session_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          attendance_confirmed?: boolean | null
          completed_at?: string | null
          date_change_requested?: boolean | null
          enrolled_at?: string | null
          enrollment_type: string
          id?: string
          program_id: string
          requested_session_id?: string | null
          session_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          attendance_confirmed?: boolean | null
          completed_at?: string | null
          date_change_requested?: boolean | null
          enrolled_at?: string | null
          enrollment_type?: string
          id?: string
          program_id?: string
          requested_session_id?: string | null
          session_id?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_program_enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_program_enrollments_requested_session_id_fkey"
            columns: ["requested_session_id"]
            isOneToOne: false
            referencedRelation: "program_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_program_enrollments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "program_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_requests: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          processed_at: string | null
          program_id: string | null
          request_type: string
          requested_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          processed_at?: string | null
          program_id?: string | null
          request_type: string
          requested_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          processed_at?: string | null
          program_id?: string | null
          request_type?: string
          requested_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_requests_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
