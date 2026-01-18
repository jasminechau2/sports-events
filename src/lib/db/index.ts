/**
 * Database client factory
 * Centralizes Supabase client creation for server-side use
 */
export { createClient, createAdminClient } from "@/lib/supabase/server";
export { createClient as createBrowserClient } from "@/lib/supabase/client";
