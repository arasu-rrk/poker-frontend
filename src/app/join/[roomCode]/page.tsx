"use client";

import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDemoStore } from "@/stores/demo-store";

function JoinRoomContent() {
  const params = useParams<{ roomCode: string }>();
  const router = useRouter();
  const rooms = useDemoStore((state) => state.rooms);
  const setActiveRoom = useDemoStore((state) => state.setActiveRoom);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"participant" | "observer">("participant");
  const room = rooms.find((item) => item.code.toLowerCase() === params.roomCode.toLowerCase()) ?? rooms[0];
  if (!room) return <div className="p-8">Room not found.</div>;
  function join() {
    setActiveRoom(room.id);
    router.push(`/rooms/${room.id}`);
  }
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-md px-4 py-12 sm:py-20">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium text-emerald-600">Room found</p>
          <h1 className="mt-2 text-xl font-semibold">{room.name}</h1>
          <p className="mt-2 text-sm text-zinc-500">{room.description}</p>
          <div className="mt-5 flex gap-3 text-xs text-zinc-500"><span>{room.participants.length} participants</span><span>{room.stories.length} stories</span></div>
          <div className="mt-6">
            <label htmlFor="display-name" className="text-sm font-medium">Display name</label>
            <Input id="display-name" className="mt-2" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
          </div>
          {room.settings.enableObservers && (
            <fieldset className="mt-5">
              <legend className="text-sm font-medium">Join as</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["participant", "observer"] as const).map((option) => (
                  <label key={option} className={`cursor-pointer rounded-lg border p-3 text-sm capitalize ${role === option ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950" : "border-zinc-200 dark:border-zinc-800"}`}>
                    <input type="radio" className="sr-only" checked={role === option} onChange={() => setRole(option)} />{option}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <Button className="mt-6 w-full" disabled={!name.trim()} onClick={join}>Join room</Button>
        </div>
      </main>
    </div>
  );
}

export default function JoinRoomPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-zinc-500">Loading room…</div>}>
      <JoinRoomContent />
    </Suspense>
  );
}
