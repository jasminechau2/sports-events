"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp } from "@/lib/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { useGoogleAuth } from "./use-google-auth";

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

export type SignUpFormValues = z.infer<typeof signUpSchema>;

interface UseSignUpReturn {
  form: ReturnType<typeof useForm<SignUpFormValues>>;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isDisabled: boolean;
  onSubmit: (data: SignUpFormValues) => Promise<void>;
  onGoogleSignUp: () => Promise<void>;
}

export function useSignUp(): UseSignUpReturn {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isGoogleLoading, onGoogleAuth } = useGoogleAuth();

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

  return {
    form,
    isLoading,
    isGoogleLoading,
    isDisabled,
    onSubmit,
    onGoogleSignUp: onGoogleAuth,
  };
}
