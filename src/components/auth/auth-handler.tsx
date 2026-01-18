"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthTokens = async () => {
      const hash = window.location.hash;

      // Check for error in hash (e.g., expired link)
      if (hash && hash.includes("error=")) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const error = hashParams.get("error");
        const errorDescription = hashParams.get("error_description");

        // Redirect to login with error message
        const errorMsg = errorDescription || error || "Authentication failed";
        window.history.replaceState(null, "", window.location.pathname);
        router.push(`/auth/login?error=${encodeURIComponent(errorMsg)}`);
        return;
      }

      // Check for access token in hash (implicit flow)
      if (hash && hash.includes("access_token")) {
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const supabase = createClient();
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          // Clear the hash from URL
          window.history.replaceState(null, "", window.location.pathname);

          if (!error) {
            router.push("/dashboard");
            router.refresh();
          } else {
            router.push(`/auth/login?error=${encodeURIComponent(error.message)}`);
          }
        }
      }
    };

    handleAuthTokens();
  }, [router]);

  return null;
}
