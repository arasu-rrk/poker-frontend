export type DeckName = "Fibonacci" | "Modified Fibonacci" | "T-shirt sizing" | "Sequential" | "Custom";

export type Vote = string | null;
export type ParticipantRole = "moderator" | "participant" | "observer";

export interface Participant {
  id: string;
  name: string;
  initials: string;
  role: ParticipantRole;
  online: boolean;
  vote?: Vote;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  ticketUrl?: string;
  status: "pending" | "estimated";
  finalEstimate?: string;
}

export interface RoomSettings {
  allowGuests: boolean;
  requireApproval: boolean;
  enableObservers: boolean;
  defaultVisibility: "hidden" | "moderator";
  allowVoteChanges: boolean;
  autoReveal: boolean;
}

export interface Room {
  id: string;
  name: string;
  code: string;
  description: string;
  deck: DeckName;
  customCards: string[];
  settings: RoomSettings;
  participants: Participant[];
  stories: Story[];
  currentStoryIndex: number;
  revealed: boolean;
  lastActive: string;
}

export interface WebSocketMessage<T = unknown> {
  version: 1;
  type: string;
  messageId: string;
  timestamp: string;
  payload: T;
}
