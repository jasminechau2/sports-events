import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className="
        flex min-h-screen items-center justify-center
        bg-gradient-to-br from-blue-50 to-indigo-100
        p-4
        sm:p-6
        md:p-8
      "
    >
      {children}
    </div>
  );
}
