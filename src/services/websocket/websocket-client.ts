import { z } from "zod";
import type { WebSocketMessage } from "@/types/planning-poker";

export const incomingTypes = [
  "ROOM_STATE", "PARTICIPANT_JOINED", "PARTICIPANT_LEFT", "PARTICIPANT_UPDATED",
  "STORY_CHANGED", "VOTE_SUBMITTED", "VOTE_RETRACTED", "VOTES_REVEALED",
  "VOTES_HIDDEN", "VOTING_RESET", "SESSION_UPDATED", "ROOM_SETTINGS_UPDATED",
  "MODERATOR_CHANGED", "ERROR",
] as const;

export const outgoingTypes = [
  "JOIN_ROOM", "LEAVE_ROOM", "UPDATE_PARTICIPANT", "SELECT_VOTE", "RETRACT_VOTE",
  "REVEAL_VOTES", "HIDE_VOTES", "RESET_VOTING", "CHANGE_STORY",
  "UPDATE_ROOM_SETTINGS", "START_NEW_ROUND",
] as const;

export const webSocketMessageSchema = z.object({
  version: z.literal(1),
  type: z.string(),
  messageId: z.string(),
  timestamp: z.string(),
  payload: z.unknown(),
});

export type ConnectionStatus = "connecting" | "connected" | "reconnecting" | "disconnected";

export class ReusableWebSocketClient {
  private socket: WebSocket | null = null;
  private reconnectAttempt = 0;
  private disposed = false;

  constructor(
    private url: string,
    private onMessage: (message: WebSocketMessage) => void,
    private onStatus: (status: ConnectionStatus) => void,
  ) {}

  connect() {
    if (typeof WebSocket === "undefined") return;
    this.disposed = false;
    this.onStatus(this.reconnectAttempt ? "reconnecting" : "connecting");
    this.socket = new WebSocket(this.url);
    this.socket.onopen = () => {
      this.reconnectAttempt = 0;
      this.onStatus("connected");
    };
    this.socket.onmessage = (event) => {
      try {
        const parsed = webSocketMessageSchema.safeParse(JSON.parse(event.data));
        if (parsed.success) this.onMessage(parsed.data as WebSocketMessage);
      } catch {
        // Ignore malformed frames and keep the connection usable.
      }
    };
    this.socket.onclose = () => {
      if (this.disposed) {
        this.onStatus("disconnected");
        return;
      }
      this.onStatus("reconnecting");
      const delay = Math.min(30000, 500 * 2 ** this.reconnectAttempt);
      const jitter = Math.random() * 250;
      this.reconnectAttempt += 1;
      window.setTimeout(() => this.connect(), delay + jitter);
    };
  }

  send(type: (typeof outgoingTypes)[number], payload: unknown) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return false;
    const message: WebSocketMessage = {
      version: 1,
      type,
      messageId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      payload,
    };
    this.socket.send(JSON.stringify(message));
    return true;
  }

  dispose() {
    this.disposed = true;
    this.socket?.close();
  }
}
