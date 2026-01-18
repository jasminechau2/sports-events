import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthHandler } from "@/components/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sports Events Manager",
  description: "Manage your sports events with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthHandler />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
