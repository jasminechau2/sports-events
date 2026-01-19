"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { createEvent, updateEvent } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, X, Plus, Loader2 } from "lucide-react";
import { SPORT_TYPES, type Event, type SportType } from "@/types";

const eventSchema = z.object({
  name: z.string().min(1, "Event name is required").max(255, "Event name is too long"),
  sport_type: z.enum(SPORT_TYPES as unknown as [SportType, ...SportType[]], {
    required_error: "Please select a sport type",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  description: z.string().optional(),
  venues: z.array(z.string()).refine(
    (venues) => venues.filter((v) => v.trim() !== "").length >= 1,
    { message: "At least one venue is required" }
  ),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Event;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(event);
  const form = useForm<EventFormValues, unknown, EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name || "",
      sport_type: (event?.sport_type as SportType) || "Soccer",
      date: event?.date_time ? new Date(event.date_time) : undefined,
      time: event?.date_time ? format(new Date(event.date_time), "HH:mm") : "",
      description: event?.description || "",
      venues: event?.venues?.length ? event.venues : [""],
    },
  });

  const venues = form.watch("venues");

  const addVenue = () => {
    const currentVenues = form.getValues("venues");
    form.setValue("venues", [...currentVenues, ""]);
  };

  const removeVenue = (index: number) => {
    const currentVenues = form.getValues("venues");
    if (currentVenues.length > 1) {
      form.setValue(
        "venues",
        currentVenues.filter((_, i) => i !== index)
      );
    }
  };

  const updateVenue = (index: number, value: string) => {
    const currentVenues = form.getValues("venues");
    const newVenues = [...currentVenues];
    newVenues[index] = value;
    form.setValue("venues", newVenues);
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);

    // Combine date and time
    const [hours, minutes] = data.time.split(":").map(Number);
    const dateTime = new Date(data.date);
    dateTime.setHours(hours, minutes, 0, 0);

    const formData = {
      name: data.name,
      sport_type: data.sport_type,
      date_time: dateTime.toISOString(),
      description: data.description,
      venues: data.venues.filter((v) => v.trim() !== ""),
    };

    if (event) {
      const result = isEditing ? await updateEvent(event!.id, formData) : await createEvent(formData);

      if (!result.success) {
        toast({
          variant: "destructive",
          title: `Failed to ${isEditing ? "update" : "create"} event`,
          description: result.error,
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: `Event ${isEditing ? "updated" : "created"}`,
        description: `Your event has been successfully ${isEditing ? "updated" : "created"}.`,
      });
    } else {
      const result = await createEvent(formData);

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Failed to create event",
          description: result.error,
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Event created",
        description: "Your event has been successfully created.",
      });
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter event name"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sport_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport Type *</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SPORT_TYPES.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date *</FormLabel>
                <Popover>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="date"
                        disabled={isSubmitting}
                        value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value + "T00:00:00") : undefined;
                          field.onChange(date);
                        }}
                        className="pr-10"
                      />
                    </FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isSubmitting}
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      >
                        <CalendarIcon className="size4 text-muted-foreground" />
                        <span className="sr-only">Open calendar</span>
                      </Button>
                    </PopoverTrigger>
                  </div>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time *</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Venues *</FormLabel>
          <FormDescription>
            Add one or more venues for your event
          </FormDescription>
          <div className="space-y-2">
            {venues.map((venue, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={venue}
                  onChange={(e) => updateVenue(index, e.target.value)}
                  placeholder={`Venue ${index + 1}`}
                  disabled={isSubmitting}
                />
                {venues.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeVenue(index)}
                    disabled={isSubmitting}
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addVenue}
            disabled={isSubmitting}
          >
            <Plus className="mr-2 size-4" />
            Add Venue
          </Button>
          {form.formState.errors.venues && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.venues.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter event description (optional)"
                  rows={4}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional details about your event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {event ? "Updating..." : "Creating..."}
              </>
            ) : event ? (
              "Update Event"
            ) : (
              "Create Event"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
