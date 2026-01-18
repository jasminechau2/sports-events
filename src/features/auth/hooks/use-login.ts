"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import { useGoogleAuth } from "./use-google-auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface UseLoginReturn {
  form: ReturnType<typeof useForm<LoginFormValues>>;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isDisabled: boolean;
  onSubmit: (data: LoginFormValues) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { isGoogleLoading, onGoogleAuth } = useGoogleAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isDisabled = isLoading || isGoogleLoading;

  // Handle OAuth callback tokens in URL hash
  useEffect(() => {
    const handleHashTokens = async () => {
      const hash = window.location.hash;
      if (!hash || !hash.includes("access_token")) return;

      const hashParams = new URLSearchParams(hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (!accessToken || !refreshToken) return;

      const supabase = createClient();
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      window.history.replaceState(null, "", window.location.pathname);

      if (error) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Email confirmed!",
        description: "Your email has been verified. Welcome!",
      });

      router.push("/dashboard");
      router.refresh();
    };

    handleHashTokens();
  }, [router, toast]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    const result = await signIn({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: result.error,
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });

    router.push("/dashboard");
    router.refresh();
  };

  return {
    form,
    isLoading,
    isGoogleLoading,
    isDisabled,
    onSubmit,
    onGoogleLogin: onGoogleAuth,
  };
}
