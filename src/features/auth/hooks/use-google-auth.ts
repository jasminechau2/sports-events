"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/actions/auth";
import { useToast } from "@/components/ui/use-toast";

interface UseGoogleAuthOptions {
  onError?: (error: string) => void;
}

interface UseGoogleAuthReturn {
  isGoogleLoading: boolean;
  onGoogleAuth: () => Promise<void>;
}

export function useGoogleAuth(options?: UseGoogleAuthOptions): UseGoogleAuthReturn {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();

  const onGoogleAuth = async () => {
    setIsGoogleLoading(true);

    const result = await signInWithGoogle();
    console.log("Google auth result:", result);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: result.error,
      });
      options?.onError?.(result.error);
      setIsGoogleLoading(false);
      return;
    }

    window.location.href = result.data;
  };

  return {
    isGoogleLoading,
    onGoogleAuth,
  };
}
