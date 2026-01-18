export const routes = {
  home: "/",

  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    callback: "/auth/callback",
  },

  dashboard: "/dashboard",

  events: {
    new: "/events/new",
    edit: (id: string) => `/events/${id}/edit` as const,
  },
} as const;

// Protected routes that require authentication
export const protectedRoutes = ["/dashboard", "/events"] as const;

// Auth routes that should redirect to dashboard if already logged in
export const authRoutes = ["/auth/login", "/auth/signup"] as const;

export type Routes = typeof routes;
