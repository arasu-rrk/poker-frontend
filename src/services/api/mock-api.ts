import type { Room } from "@/types/planning-poker";

export function getMockRooms(rooms: Room[]) {
  return Promise.resolve(rooms);
}
