"use client";

import Link from "next/link";
import { useEventsFilter } from "@/hooks";
import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/layout";
import { Plus, Search, Calendar, Loader2, X } from "lucide-react";
import { SPORT_TYPES, type Event } from "@/types";

interface EventsListProps {
  initialEvents: Event[];
}

export function EventsList({ initialEvents }: EventsListProps) {
  const {
    events,
    search,
    sportType,
    isPending,
    hasFilters,
    setSearch,
    handleSearch,
    handleKeyDown,
    handleSportChange,
    handleClear,
  } = useEventsFilter({ initialEvents });

  return (
    <div className="space-y-6">
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                size-4 text-muted-foreground
              "
            />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-9 sm:w-64"
              disabled={isPending}
            />
          </div>

          <Select
            value={sportType}
            onValueChange={handleSportChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {SPORT_TYPES.map((sport) => (
                <SelectItem key={sport} value={sport}>
                  {sport}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>

          {hasFilters && (
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isPending}
            >
              <X className="mr-2 size-4" />
              Clear
            </Button>
          )}
        </div>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/events/new">
            <Plus className="mr-2 size-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {isPending ? (
        <LoadingSpinner />
      ) : events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description={
            hasFilters
              ? "Try adjusting your search or filter"
              : "Get started by creating your first event"
          }
          action={
            !hasFilters && (
              <Button asChild>
                <Link href="/events/new">
                  <Plus className="mr-2 size-4" />
                  Create Event
                </Link>
              </Button>
            )
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
