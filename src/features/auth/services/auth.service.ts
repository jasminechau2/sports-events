"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { User, SignInDTO, SignUpDTO } from "@/types";
import { createClient } from "@/lib/db";
import { AuthenticationError } from "@/lib/errors";

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(
  client?: SupabaseClient
): Promise<User | null> {
  const supabase = client ?? (await createClient());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || "",
    created_at: user.created_at,
  };
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(client?: SupabaseClient): Promise<User> {
  const user = await getCurrentUser(client);
  if (!user) {
    throw new AuthenticationError("Not authenticated");
  }
  return user;
}

/**
 * Sign in with email and password
 */
export async function signIn(dto: SignInDTO): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: dto.email,
    password: dto.password,
  });

  if (error) {
    throw new AuthenticationError(error.message);
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(dto: SignUpDTO): Promise<void> {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email: dto.email,
    password: dto.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    throw new AuthenticationError(error.message);
  }
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(
  provider: "google"
): Promise<string> {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    throw new AuthenticationError(error.message);
  }

  if (!data.url) {
    throw new AuthenticationError("Failed to get OAuth URL");
  }

  return data.url;
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new AuthenticationError(error.message);
  }
}
