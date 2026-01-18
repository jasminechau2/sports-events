"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, signInWithGoogle } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import {
  AuthLayout,
  AuthCard,
  Divider,
  GoogleButton,
  SubmitButton,
} from "@/components/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isDisabled = isLoading || isGoogleLoading;

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

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    const result = await signInWithGoogle();

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: result.error,
      });
      setIsGoogleLoading(false);
      return;
    }

    window.location.href = result.data;
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        description="Sign in to manage your sports events"
        footer={<FooterLink />}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      disabled={isDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton
              isLoading={isLoading}
              disabled={isDisabled}
              label="Sign In"
              loadingLabel="Signing in..."
            />
          </form>
        </Form>

        <Divider />

        <GoogleButton
          onClick={handleGoogleLogin}
          isLoading={isGoogleLoading}
          disabled={isDisabled}
        />
      </AuthCard>
    </AuthLayout>
  );
}

function FooterLink() {
  return (
    <p className="text-sm text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link
        href="/auth/signup"
        className="font-medium text-primary hover:underline"
      >
        Sign up
      </Link>
    </p>
  );
}
