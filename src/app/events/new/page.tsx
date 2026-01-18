import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/actions/auth";
import { Header } from "@/components/dashboard/header";
import { EventForm } from "@/components/events/event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function NewEventPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={user.email} />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <EventForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
