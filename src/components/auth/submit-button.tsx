"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel: string;
}

export function SubmitButton({
  isLoading = false,
  disabled = false,
  label,
  loadingLabel,
}: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={disabled || isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
