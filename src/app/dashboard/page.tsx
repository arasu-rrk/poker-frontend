"use client";

import Link from "next/link";
import { Clock3, Plus, Users } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/stores/demo-store";

export default function DashboardPage() {
  const rooms = useDemoStore((state) => state.rooms);
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="text-sm text-zinc-500">Good afternoon</p><h1 className="mt-1 text-2xl font-semibold">Your estimation rooms</h1></div>
          <div className="flex gap-2">
            <Link href="/join/demo"><Button variant="secondary">Join room</Button></Link>
            <Link href="/rooms/create"><Button><Plus className="size-4" />Create room</Button></Link>
          </div>
        </div>
        {rooms.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <h2 className="font-semibold">No rooms yet</h2><p className="mt-2 text-sm text-zinc-500">Create a room or join one with a room code.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {rooms.map((room) => (
              <article key={room.id} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-start justify-between">
                  <div><span className="text-xs font-medium text-emerald-600">Active</span><h2 className="mt-1 font-semibold">{room.name}</h2><p className="mt-1 text-xs text-zinc-500">Code {room.code}</p></div>
                  <Link href={`/rooms/${room.id}`}><Button size="sm" variant="secondary">Join</Button></Link>
                </div>
                <p className="mt-4 line-clamp-2 text-sm text-zinc-500">{room.description}</p>
                <div className="mt-5 flex items-center gap-5 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
                  <span className="flex items-center gap-1.5"><Users className="size-3.5" />{room.participants.length} participants</span>
                  <span>{room.stories.length} stories</span>
                  <span className="ml-auto flex items-center gap-1.5"><Clock3 className="size-3.5" />{room.lastActive}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
