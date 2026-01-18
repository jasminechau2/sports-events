import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth";
import { getEvents } from "@/lib/actions/events";
import { AppHeader, PageHeader, LoadingSpinner } from "@/components/layout";
import { EventsList } from "@/components/dashboard/events-list";
import type { SportType } from "@/types";

interface DashboardPageProps {
  searchParams: Promise<{ search?: string; sport?: SportType }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const params = await searchParams;
  const result = await getEvents({
    search: params.search,
    sportType: params.sport || "all",
  });

  const events = result.success ? result.data : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader userEmail={user.email} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <PageHeader
          title="Dashboard"
          description="Manage your sports events"
          className="mb-6 sm:mb-8"
        />

        <Suspense fallback={<LoadingSpinner />}>
          <EventsList initialEvents={events} />
        </Suspense>
      </main>
    </div>
  );
}
