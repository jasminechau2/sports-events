"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { deleteEvent } from "@/lib/actions/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import type { Event, EventColor } from "@/types";
import { cn } from "@/lib/utils";

const COLOR_STYLES: Record<EventColor, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteEvent(event.id);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Failed to delete event",
        description: result.error,
      });
      setIsDeleting(false);
      return;
    }

    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    });
    setIsAlertOpen(false);
  };

  return (
    <Card className={cn(
      "transition-shadow hover:shadow-md overflow-hidden",
      event.color && "relative"
    )}>
      {event.color && (
        <div className={cn("absolute left-0 top-0 h-full w-1", COLOR_STYLES[event.color])} />
      )}
      <CardHeader className={cn("pb-3", event.color && "pl-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="line-clamp-1 text-lg">
              {event.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{event.sport_type}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 shrink-0">
                <MoreVertical className="size-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/events/${event.id}/edit`}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>

              <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &quot;{event.name}&quot;?
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-3", event.color && "pl-5")}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4 shrink-0" />
          <span>{format(new Date(event.date_time), "PPP 'at' p")}</span>
        </div>

        {event.venues.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span className="line-clamp-2">{event.venues.join(", ")}</span>
          </div>
        )}

        {event.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
