import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/shared/lib";

export function HeaderSkeleton() {
  return (
    <header
      className="
        sticky top-0 z-50 w-full border-b
        bg-background/95 backdrop-blur
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-32" />
        </div>

        <Skeleton className="size-10 rounded-full" />
      </div>
    </header>
  );
}

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}

interface PageSkeletonProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "",
} as const;

export function PageSkeleton({ children, maxWidth = "full" }: PageSkeletonProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSkeleton />
      <main
        className={cn(
          "container mx-auto px-4 py-6 sm:py-8",
          maxWidthClasses[maxWidth]
        )}
      >
        {children}
      </main>
    </div>
  );
}

interface FormCardSkeletonProps {
  titleWidth?: string;
}

export function FormCardSkeleton({ titleWidth = "w-48" }: FormCardSkeletonProps) {
  return (
    <>
      <Skeleton className="mb-6 h-10 w-40" />

      <div className="rounded-lg border bg-card p-6">
        <Skeleton className={cn("mb-6 h-7", titleWidth)} />
        <LoadingSpinner />
      </div>
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-48" />
        <Skeleton className="h-5 w-64" />
      </div>

      <LoadingSpinner />
    </>
  );
}
