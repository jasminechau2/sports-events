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
import { useSignUp } from "@/features/auth/hooks";

export default function SignUpPage() {
  const {
    form,
    isLoading,
    isGoogleLoading,
    isDisabled,
    onSubmit,
    onGoogleSignUp,
  } = useSignUp();

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
          onClick={onGoogleSignUp}
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
