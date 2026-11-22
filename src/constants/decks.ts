import type { DeckName } from "@/types/planning-poker";

export const ESTIMATION_DECKS: Record<DeckName, string[]> = {
  Fibonacci: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"],
  "Modified Fibonacci": ["0", "½", "1", "2", "3", "5", "8", "13", "20", "40", "100", "?"],
  "T-shirt sizing": ["XS", "S", "M", "L", "XL", "XXL", "?"],
  Sequential: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "?"],
  Custom: [],
};
