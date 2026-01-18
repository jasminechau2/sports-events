import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "",
} as const;

export function PageLayout({
  children,
  maxWidth = "full",
  className,
}: PageLayoutProps) {
  return (
    <main
      className={cn(
        "container mx-auto px-4 py-6 sm:py-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </main>
  );
}
