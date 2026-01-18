"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp, signInWithGoogle } from "@/lib/actions/auth";
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
import {
  AuthLayout,
  AuthCard,
  Divider,
  GoogleButton,
  SubmitButton,
} from "@/components/auth";

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isDisabled = isLoading || isGoogleLoading;

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);

    const result = await signUp({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: result.error,
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Check your email",
      description: "We sent you a confirmation link to verify your email.",
    });

    setIsLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);

    const result = await signInWithGoogle();

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
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
        title="Create an Account"
        description="Sign up to start managing your sports events"
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
                      placeholder="Create a password"
                      autoComplete="new-password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
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
              label="Create Account"
              loadingLabel="Creating account..."
            />
          </form>
        </Form>

        <Divider />

        <GoogleButton
          onClick={handleGoogleSignUp}
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
      Already have an account?{" "}
      <Link
        href="/auth/login"
        className="font-medium text-primary hover:underline"
      >
        Sign in
      </Link>
    </p>
  );
}
