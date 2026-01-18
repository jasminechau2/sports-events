export interface SportConfig {
  id: string;
  name: string;
  emoji: string;
  category: "team" | "individual" | "water" | "combat" | "other";
}

export const sportsConfig: readonly SportConfig[] = [
  { id: "soccer", name: "Soccer", emoji: "\u26BD", category: "team" },
  { id: "basketball", name: "Basketball", emoji: "\uD83C\uDFC0", category: "team" },
  { id: "tennis", name: "Tennis", emoji: "\uD83C\uDFBE", category: "individual" },
  { id: "baseball", name: "Baseball", emoji: "\u26BE", category: "team" },
  { id: "football", name: "Football", emoji: "\uD83C\uDFC8", category: "team" },
  { id: "hockey", name: "Hockey", emoji: "\uD83C\uDFD2", category: "team" },
  { id: "golf", name: "Golf", emoji: "\u26F3", category: "individual" },
  { id: "swimming", name: "Swimming", emoji: "\uD83C\uDFCA", category: "water" },
  { id: "running", name: "Running", emoji: "\uD83C\uDFC3", category: "individual" },
  { id: "volleyball", name: "Volleyball", emoji: "\uD83C\uDFD0", category: "team" },
  { id: "other", name: "Other", emoji: "\uD83C\uDFC6", category: "other" },
] as const;

// Derive sport IDs for type safety
export const SPORT_IDS = sportsConfig.map((s) => s.id);

// Helper functions
export function getSportConfig(id: string): SportConfig | undefined {
  return sportsConfig.find((s) => s.id === id);
}

export function getSportEmoji(id: string): string {
  return getSportConfig(id)?.emoji ?? "\uD83C\uDFC6";
}

export function getSportName(id: string): string {
  return getSportConfig(id)?.name ?? "Other";
}

export function getSportsByCategory(
  category: SportConfig["category"]
): SportConfig[] {
  return sportsConfig.filter((s) => s.category === category);
}
