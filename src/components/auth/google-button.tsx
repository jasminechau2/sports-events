"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./google-icon";
import { Loader2 } from "lucide-react";

interface GoogleButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
}

export function GoogleButton({
  onClick,
  isLoading = false,
  disabled = false,
  label = "Continue with Google",
  loadingLabel = "Connecting...",
}: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <GoogleIcon className="mr-2" />
          {label}
        </>
      )}
    </Button>
  );
}
