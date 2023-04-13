export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          created_at: string | null
          id: number
          isCompleted: boolean | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          isCompleted?: boolean | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          isCompleted?: boolean | null
          title?: string | null
        }
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
