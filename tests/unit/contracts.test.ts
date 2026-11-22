import { describe, expect, it } from "vitest";
import { ESTIMATION_DECKS } from "@/constants/decks";
import { roomFormSchema } from "@/services/api/api-client";
import { webSocketMessageSchema } from "@/services/websocket/websocket-client";

describe("planning poker contracts", () => {
  it("provides the expected Fibonacci deck", () => {
    expect(ESTIMATION_DECKS.Fibonacci).toEqual(["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"]);
  });

  it("validates room names", () => {
    expect(roomFormSchema.safeParse({
      name: "X",
      description: "",
      deck: "Fibonacci",
      allowGuests: true,
      requireApproval: false,
      enableObservers: true,
    }).success).toBe(false);
  });

  it("validates versioned WebSocket messages", () => {
    expect(webSocketMessageSchema.safeParse({
      version: 1,
      type: "ROOM_STATE",
      messageId: "message-1",
      timestamp: "2026-11-22T00:00:00Z",
      payload: {},
    }).success).toBe(true);
  });
});
