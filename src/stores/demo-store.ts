"use client";

import { create } from "zustand";
import { ESTIMATION_DECKS } from "@/constants/decks";
import { initials } from "@/lib/utils";
import type { Room, Vote } from "@/types/planning-poker";

interface DemoState {
  rooms: Room[];
  activeRoomId: string | null;
  setActiveRoom: (id: string) => void;
  createRoom: (name: string, description: string, deck: Room["deck"], customCards: string[]) => Room;
  selectVote: (roomId: string, vote: Vote) => void;
  reveal: (roomId: string) => void;
  reset: (roomId: string) => void;
  changeStory: (roomId: string, index: number) => void;
  updateDeck: (roomId: string, deck: Room["deck"], customCards?: string[]) => void;
}

const sampleParticipants = [
  { id: "p1", name: "Alex Morgan", role: "moderator" as const, online: true },
  { id: "p2", name: "Priya Shah", role: "participant" as const, online: true },
  { id: "p3", name: "Marcus Lee", role: "participant" as const, online: true },
  { id: "p4", name: "Jordan Kim", role: "participant" as const, online: false },
];

const participantVotes: Record<string, string> = { p1: "5", p2: "8", p3: "5", p4: "?" };

function makeRoom(overrides: Partial<Room> = {}): Room {
  return {
    id: "room-1",
    name: "Core Product Refinement",
    code: "PP-4821",
    description: "Weekly estimation session for the core product backlog.",
    deck: "Fibonacci",
    customCards: [],
    settings: {
      allowGuests: true,
      requireApproval: false,
      enableObservers: true,
      defaultVisibility: "hidden",
      allowVoteChanges: true,
      autoReveal: false,
    },
    participants: sampleParticipants.map((participant) => ({
      ...participant,
      initials: initials(participant.name),
      vote: participantVotes[participant.id],
    })),
    stories: [
      { id: "story-1", title: "Add team member invitations", description: "Allow workspace admins to invite teammates by email and assign a starting role.", acceptanceCriteria: ["Email validation", "Pending invite state", "Role assignment"], status: "pending" },
      { id: "story-2", title: "Export sprint report", description: "Generate a downloadable summary of completed work and estimates.", acceptanceCriteria: ["CSV export", "Date range filtering"], status: "pending" },
      { id: "story-3", title: "Improve command palette", description: "Make navigation faster for keyboard-first users.", acceptanceCriteria: ["Fuzzy search", "Recent results"], status: "estimated", finalEstimate: "5" },
    ],
    currentStoryIndex: 0,
    revealed: false,
    lastActive: "Just now",
    ...overrides,
  };
}

export const useDemoStore = create<DemoState>((set) => ({
  rooms: [makeRoom()],
  activeRoomId: "room-1",
  setActiveRoom: (id) => set({ activeRoomId: id }),
  createRoom: (name, description, deck, customCards) => {
    const room = makeRoom({
      id: `room-${Date.now()}`,
      code: `PP-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      description,
      deck,
      customCards,
      participants: [
        { id: "p1", name: "Alex Morgan", initials: "AM", role: "moderator", online: true },
      ],
      stories: [
        { id: `story-${Date.now()}`, title: "Untitled story", description: "Add a description for this story.", acceptanceCriteria: [], status: "pending" },
      ],
      revealed: false,
    });
    set((state) => ({ rooms: [...state.rooms, room], activeRoomId: room.id }));
    return room;
  },
  selectVote: (roomId, vote) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? { ...room, participants: room.participants.map((participant) => participant.id === "p1" ? { ...participant, vote } : participant) }
          : room,
      ),
    })),
  reveal: (roomId) => set((state) => ({ rooms: state.rooms.map((room) => room.id === roomId ? { ...room, revealed: true } : room) })),
  reset: (roomId) => set((state) => ({
    rooms: state.rooms.map((room) => room.id === roomId
      ? { ...room, revealed: false, participants: room.participants.map((participant) => ({ ...participant, vote: undefined })) }
      : room),
  })),
  changeStory: (roomId, index) => set((state) => ({
    rooms: state.rooms.map((room) => room.id === roomId
      ? { ...room, currentStoryIndex: Math.max(0, Math.min(index, room.stories.length - 1)), revealed: false }
      : room),
  })),
  updateDeck: (roomId, deck, customCards) => set((state) => ({
    rooms: state.rooms.map((room) => room.id === roomId ? { ...room, deck, customCards: customCards ?? ESTIMATION_DECKS[deck] } : room),
  })),
}));
