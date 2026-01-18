"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEvents } from "../actions/events.actions";
import { useToast } from "@/shared/hooks";
import type { Event, SportType } from "@/types";

interface UseEventsFilterOptions {
  initialEvents: Event[];
}

interface UseEventsFilterReturn {
  events: Event[];
  search: string;
  sportType: SportType | "all";
  isPending: boolean;
  hasFilters: boolean;
  setSearch: (value: string) => void;
  handleSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSportChange: (value: string) => void;
  handleClear: () => void;
}

export function useEventsFilter({
  initialEvents,
}: UseEventsFilterOptions): UseEventsFilterReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sportType, setSportType] = useState<SportType | "all">(
    (searchParams.get("sport") as SportType) || "all"
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const updateUrlAndFetch = async (
    searchValue: string,
    sportValue: SportType | "all"
  ) => {
    const params = new URLSearchParams();
    if (searchValue) params.set("search", searchValue);
    if (sportValue !== "all") params.set("sport", sportValue);

    router.push(`/dashboard?${params.toString()}`);

    const result = await getEvents({
      search: searchValue || undefined,
      sportType: sportValue,
    });

    if (result.success) {
      setEvents(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch events",
        description: result.error,
      });
    }
  };

  const handleSearch = () => {
    startTransition(() => {
      updateUrlAndFetch(search, sportType);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSportChange = (value: string) => {
    const newSportType = value as SportType | "all";
    setSportType(newSportType);
    startTransition(() => {
      updateUrlAndFetch(search, newSportType);
    });
  };

  const handleClear = () => {
    setSearch("");
    setSportType("all");
    startTransition(() => {
      updateUrlAndFetch("", "all");
    });
  };

  return {
    events,
    search,
    sportType,
    isPending,
    hasFilters: Boolean(search || sportType !== "all"),
    setSearch,
    handleSearch,
    handleKeyDown,
    handleSportChange,
    handleClear,
  };
}
