"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AuthLayout,
  AuthCard,
  Divider,
  GoogleButton,
  SubmitButton,
} from "@/components/auth";
import { useLogin } from "@/features/auth/hooks";

export default function LoginPage() {
  const {
    form,
    isLoading,
    isGoogleLoading,
    isDisabled,
    onSubmit,
    onGoogleLogin,
  } = useLogin();

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
          onClick={onGoogleLogin}
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
