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
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login_at: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          last_login_at?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login_at?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_ru: string | null
          end_date: string
          event_type: string | null
          grades: string[] | null
          id: string
          is_published: boolean | null
          location: string | null
          start_date: string
          title_en: string
          title_ru: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_ru?: string | null
          end_date: string
          event_type?: string | null
          grades?: string[] | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          start_date: string
          title_en: string
          title_ru: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_ru?: string | null
          end_date?: string
          event_type?: string | null
          grades?: string[] | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          start_date?: string
          title_en?: string
          title_ru?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cms_page_status_logs: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: string | null
          id: string
          metadata: Json
          page_id: string
          to_status: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          metadata?: Json
          page_id: string
          to_status: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          metadata?: Json
          page_id?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_page_status_logs_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_pages: {
        Row: {
          id: string
          published_at: string | null
          scheduled_at: string | null
          slug: string
          status: string
          title_en: string
          title_ru: string
          updated_at: string | null
          version: number
        }
        Insert: {
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          slug: string
          status?: string
          title_en: string
          title_ru: string
          updated_at?: string | null
          version?: number
        }
        Update: {
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          slug?: string
          status?: string
          title_en?: string
          title_ru?: string
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      cms_sections: {
        Row: {
          id: string
          is_enabled: boolean
          key: string
          order_index: number
          page_id: string
          payload: Json
          type: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          is_enabled?: boolean
          key: string
          order_index?: number
          page_id: string
          payload?: Json
          type: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_enabled?: boolean
          key?: string
          order_index?: number
          page_id?: string
          payload?: Json
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_ru: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name_en: string
          name_ru: string
          order_index: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_ru?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_en: string
          name_ru: string
          order_index?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_ru?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_en?: string
          name_ru?: string
          order_index?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string
          created_by: string | null
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          is_archived: boolean | null
          published_at: string | null
          title_en: string
          title_ru: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_by?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          is_archived?: boolean | null
          published_at?: string | null
          title_en: string
          title_ru: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_by?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_archived?: boolean | null
          published_at?: string | null
          title_en?: string
          title_ru?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          album_name_en: string
          album_name_ru: string
          category: string | null
          cover_image_url: string | null
          created_at: string | null
          description_en: string | null
          description_ru: string | null
          event_date: string | null
          id: string
          is_published: boolean | null
          updated_at: string | null
        }
        Insert: {
          album_name_en: string
          album_name_ru: string
          category?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description_en?: string | null
          description_ru?: string | null
          event_date?: string | null
          id?: string
          is_published?: boolean | null
          updated_at?: string | null
        }
        Update: {
          album_name_en?: string
          album_name_ru?: string
          category?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description_en?: string | null
          description_ru?: string | null
          event_date?: string | null
          id?: string
          is_published?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption_en: string | null
          caption_ru: string | null
          created_at: string | null
          gallery_id: string
          id: string
          image_url: string
          order_index: number | null
        }
        Insert: {
          caption_en?: string | null
          caption_ru?: string | null
          created_at?: string | null
          gallery_id: string
          id?: string
          image_url: string
          order_index?: number | null
        }
        Update: {
          caption_en?: string | null
          caption_ru?: string | null
          created_at?: string | null
          gallery_id?: string
          id?: string
          image_url?: string
          order_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "gallery"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          category: string
          content_en: string
          content_ru: string
          created_by: string | null
          description_en: string
          description_ru: string
          id: string
          image_url: string | null
          is_published: boolean | null
          priority: number | null
          published_at: string | null
          slug: string
          title_en: string
          title_ru: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content_en: string
          content_ru: string
          created_by?: string | null
          description_en: string
          description_ru: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          priority?: number | null
          published_at?: string | null
          slug: string
          title_en: string
          title_ru: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content_en?: string
          content_ru?: string
          created_by?: string | null
          description_en?: string
          description_ru?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          priority?: number | null
          published_at?: string | null
          slug?: string
          title_en?: string
          title_ru?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      staff_members: {
        Row: {
          bio_en: string | null
          bio_ru: string | null
          created_at: string | null
          department_id: string
          email: string | null
          id: string
          is_active: boolean | null
          name_en: string
          name_ru: string
          order_index: number | null
          phone: string | null
          photo_url: string | null
          position_en: string
          position_ru: string
          qualifications: string[] | null
          subjects: string[] | null
          updated_at: string | null
        }
        Insert: {
          bio_en?: string | null
          bio_ru?: string | null
          created_at?: string | null
          department_id: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name_en: string
          name_ru: string
          order_index?: number | null
          phone?: string | null
          photo_url?: string | null
          position_en: string
          position_ru: string
          qualifications?: string[] | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bio_en?: string | null
          bio_ru?: string | null
          created_at?: string | null
          department_id?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name_en?: string
          name_ru?: string
          order_index?: number | null
          phone?: string | null
          photo_url?: string | null
          position_en?: string
          position_ru?: string
          qualifications?: string[] | null
          subjects?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      suggestions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          responded_by: string | null
          response: string | null
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          response?: string | null
          status?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          response?: string | null
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[keyof Database]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never
