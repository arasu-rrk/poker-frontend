"use client";

import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ESTIMATION_DECKS } from "@/constants/decks";
import { useDemoStore } from "@/stores/demo-store";
import type { DeckName } from "@/types/planning-poker";

function RoomSettingsContent() {
  const params = useParams<{ roomId: string }>();
  const rooms = useDemoStore((state) => state.rooms);
  const updateDeck = useDemoStore((state) => state.updateDeck);
  const room = rooms.find((item) => item.id === params.roomId) ?? rooms[0];
  const [name, setName] = useState(room?.name ?? "");
  if (!room) return null;
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold">Room settings</h1>
        <div className="mt-8 space-y-6">
          <div><label htmlFor="room-name" className="text-sm font-medium">Room name</label><Input id="room-name" className="mt-2" value={name} onChange={(event) => setName(event.target.value)} /></div>
          <fieldset><legend className="text-sm font-medium">Estimation deck</legend><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{(Object.keys(ESTIMATION_DECKS) as DeckName[]).map((deck) => <button key={deck} onClick={() => updateDeck(room.id, deck)} className={`rounded-lg border p-3 text-left text-sm ${room.deck === deck ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950" : "border-zinc-200 dark:border-zinc-800"}`}>{deck}</button>)}</div></fieldset>
          <div className="space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            {["Allow guest participants", "Enable observers", "Allow vote changes", "Auto-reveal votes"].map((label) => <label key={label} className="flex items-center justify-between text-sm">{label}<input type="checkbox" defaultChecked className="size-4 accent-indigo-600" /></label>)}
          </div>
          <div className="flex justify-between border-t border-zinc-100 pt-6 dark:border-zinc-800"><Button variant="danger">Delete room</Button><Button>Save changes</Button></div>
        </div>
      </main>
    </div>
  );
}

export default function RoomSettingsPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-zinc-500">Loading settings…</div>}>
      <RoomSettingsContent />
    </Suspense>
  );
}
