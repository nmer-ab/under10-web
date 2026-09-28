// Mirrors a row of the Supabase rpc `explore_feed`.
export type FeedMedia = {
  type: "image" | "video";
  url?: string;
  poster?: string;
  duration_s?: number;
};

export type FeedItem = {
  id: string;
  name: string;
  cuisine: string;
  price: number;
  city: string;
  distance_m: number;
  like_count: number;
  verify_count: number;
  is_official: boolean;
  open_now: boolean;
  creator_name: string | null;
  creator_avatar: string | null;
  media: FeedMedia[];
};

const CUISINE_ART: Record<string, { emoji: string; gradient: [string, string] }> = {
  kebab: { emoji: "🥙", gradient: ["#FDE68A", "#F97316"] },
  vietnamese: { emoji: "🍜", gradient: ["#FECACA", "#EF4444"] },
  bakery: { emoji: "🥐", gradient: ["#FEF3C7", "#D97706"] },
  mexican: { emoji: "🌮", gradient: ["#BBF7D0", "#10B981"] },
};

const DEFAULT_ART = { emoji: "🍽️", gradient: ["#D1FAE5", "#047857"] as [string, string] };

export function cuisineArt(cuisine: string) {
  return CUISINE_ART[cuisine] ?? DEFAULT_ART;
}
