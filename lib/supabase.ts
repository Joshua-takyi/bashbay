// Supabase client configuration
// Note: OAuth is handled via backend API endpoints
// This file is kept for potential future direct Supabase interactions

export const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
};

export const getSupabaseAnonKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
};
