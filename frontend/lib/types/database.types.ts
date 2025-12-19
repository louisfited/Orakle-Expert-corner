export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          case_id: string
          case_title: string | null
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          case_id: string
          case_title?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          case_id?: string
          case_title?: string | null
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookmarks_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      likes: {
        Row: {
          case_id: string | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          case_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          case_id?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'likes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          country_of_practice: string
          cookies_accepted: boolean
          created_at: string
          first_name: string
          id: string
          is_admin: boolean
          is_application: boolean
          last_name: string
          license_number: string
          occupation: string
          phone_number: string
          primary_specialization: string
          qualifications: string
          secondary_specialization: string
        }
        Insert: {
          country_of_practice: string
          cookies_accepted?: boolean
          created_at?: string
          first_name: string
          id: string
          is_admin?: boolean
          is_application?: boolean
          last_name: string
          license_number: string
          occupation: string
          phone_number: string
          primary_specialization: string
          qualifications: string
          secondary_specialization: string
        }
        Update: {
          country_of_practice?: string
          cookies_accepted?: boolean
          created_at?: string
          first_name?: string
          id?: string
          is_admin?: boolean
          is_application?: boolean
          last_name?: string
          license_number?: string
          occupation?: string
          phone_number?: string
          primary_specialization?: string
          qualifications?: string
          secondary_specialization?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      case_status_per_user: {
        Row: {
          case_id: string
          created_at: string
          id: number
          user_id: string
          status: string
        }
        Insert: {
          case_id: string
          created_at?: string
          user_id: string
          status: string
          id?: number
        }
        Update: {
          case_id?: string
          user_id?: string
          status: string
        }
        Relationships: [
          {
            foreignKeyName: 'case_status_per_user_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profiles_with_emails: {
        Args: Record<PropertyKey, never>
        Returns: {
          profile_id: string
          email: string
        }[]
      }
    }
    Enums: {
      case_status: 'STARTED' | 'COMPLETED'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
