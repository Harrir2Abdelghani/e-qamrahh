export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'admin' | 'user' | 'owner'
          verified: boolean
          created_at: string
          updated_at: string
          total_rentals: number
          total_earnings: number
          rating: number
          address: Json | null
          preferences: Json | null
          documents: Json | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'admin' | 'user' | 'owner'
          verified?: boolean
          created_at?: string
          updated_at?: string
          total_rentals?: number
          total_earnings?: number
          rating?: number
          address?: Json | null
          preferences?: Json | null
          documents?: Json | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'admin' | 'user' | 'owner'
          verified?: boolean
          created_at?: string
          updated_at?: string
          total_rentals?: number
          total_earnings?: number
          rating?: number
          address?: Json | null
          preferences?: Json | null
          documents?: Json | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          price: number
          deposit: number
          status: 'active' | 'inactive' | 'pending' | 'rented'
          owner_id: string
          location: string
          rating: number
          images: string[]
          created_at: string
          updated_at: string
          views: number
          bookings: number
          tags: string[]
          availability: Json
          featured: boolean
          condition: 'excellent' | 'good' | 'fair' | 'poor'
          min_rental_days: number
          max_rental_days: number
          delivery_options: Json
          specifications: Json
          policies: Json
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          price: number
          deposit?: number
          status?: 'active' | 'inactive' | 'pending' | 'rented'
          owner_id: string
          location: string
          rating?: number
          images?: string[]
          created_at?: string
          updated_at?: string
          views?: number
          bookings?: number
          tags?: string[]
          availability?: Json
          featured?: boolean
          condition?: 'excellent' | 'good' | 'fair' | 'poor'
          min_rental_days?: number
          max_rental_days?: number
          delivery_options?: Json
          specifications?: Json
          policies?: Json
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          price?: number
          deposit?: number
          status?: 'active' | 'inactive' | 'pending' | 'rented'
          owner_id?: string
          location?: string
          rating?: number
          images?: string[]
          created_at?: string
          updated_at?: string
          views?: number
          bookings?: number
          tags?: string[]
          availability?: Json
          featured?: boolean
          condition?: 'excellent' | 'good' | 'fair' | 'poor'
          min_rental_days?: number
          max_rental_days?: number
          delivery_options?: Json
          specifications?: Json
          policies?: Json
        }
      }
      bookings: {
        Row: {
          id: string
          product_id: string
          renter_id: string
          owner_id: string
          start_date: string
          end_date: string
          total_amount: number
          deposit: number
          status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'refunded'
          created_at: string
          updated_at: string
          notes: string | null
          delivery_method: 'pickup' | 'delivery'
          delivery_address: string | null
        }
        Insert: {
          id?: string
          product_id: string
          renter_id: string
          owner_id: string
          start_date: string
          end_date: string
          total_amount: number
          deposit: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
          notes?: string | null
          delivery_method?: 'pickup' | 'delivery'
          delivery_address?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          renter_id?: string
          owner_id?: string
          start_date?: string
          end_date?: string
          total_amount?: number
          deposit?: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
          notes?: string | null
          delivery_method?: 'pickup' | 'delivery'
          delivery_address?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          booking_id: string
          reviewer_id: string
          rating: number
          comment: string
          created_at: string
          helpful: number
          response: Json | null
        }
        Insert: {
          id?: string
          product_id: string
          booking_id: string
          reviewer_id: string
          rating: number
          comment: string
          created_at?: string
          helpful?: number
          response?: Json | null
        }
        Update: {
          id?: string
          product_id?: string
          booking_id?: string
          reviewer_id?: string
          rating?: number
          comment?: string
          created_at?: string
          helpful?: number
          response?: Json | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'booking' | 'payment' | 'review' | 'system'
          title: string
          message: string
          read: boolean
          created_at: string
          action_url: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'booking' | 'payment' | 'review' | 'system'
          title: string
          message: string
          read?: boolean
          created_at?: string
          action_url?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'booking' | 'payment' | 'review' | 'system'
          title?: string
          message?: string
          read?: boolean
          created_at?: string
          action_url?: string | null
          metadata?: Json | null
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
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
  }
}