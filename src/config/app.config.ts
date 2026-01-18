export const appConfig = {
  name: "Sports Events Manager",
  description: "Manage your sports events with ease",

  // Business rules
  maxEventsPerUser: 100,
  maxVenuesPerEvent: 10,
  maxEventNameLength: 255,
  maxDescriptionLength: 2000,
  minPasswordLength: 6,

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },

  // Date/Time
  dateFormat: "PPP",
  timeFormat: "HH:mm",
  dateTimeFormat: "PPP 'at' p",
} as const;

export type AppConfig = typeof appConfig;
