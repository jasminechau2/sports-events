import { z } from "zod";
import { appConfig, SPORT_IDS } from "@/config";

export const createEventSchema = z.object({
  name: z
    .string()
    .min(1, "Event name is required")
    .max(appConfig.maxEventNameLength, "Event name is too long"),
  sport_type: z.string().refine((val) => SPORT_IDS.includes(val), {
    message: "Please select a valid sport type",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  description: z
    .string()
    .max(appConfig.maxDescriptionLength, "Description is too long")
    .optional(),
  venues: z
    .array(z.string())
    .refine((venues) => venues.filter((v) => v.trim() !== "").length >= 1, {
      message: "At least one venue is required",
    })
    .refine((venues) => venues.length <= appConfig.maxVenuesPerEvent, {
      message: `Maximum ${appConfig.maxVenuesPerEvent} venues allowed`,
    }),
});

export const updateEventSchema = createEventSchema.partial();

export const eventFiltersSchema = z.object({
  search: z.string().optional(),
  sportType: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type CreateEventFormValues = z.infer<typeof createEventSchema>;
export type UpdateEventFormValues = z.infer<typeof updateEventSchema>;
export type EventFiltersValues = z.infer<typeof eventFiltersSchema>;
