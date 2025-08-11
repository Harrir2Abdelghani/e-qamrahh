import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Real-time subscriptions
export const subscribeToProducts = (callback: (payload: any) => void) => {
  return supabase
    .channel('products')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'products' }, 
      callback
    )
    .subscribe()
}

export const subscribeToBookings = (callback: (payload: any) => void) => {
  return supabase
    .channel('bookings')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'bookings' }, 
      callback
    )
    .subscribe()
}

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// File upload helper
export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  return data
}

// Get public URL for uploaded files
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}