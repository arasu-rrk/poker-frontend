"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, Menu, RotateCcw, Settings, Wifi } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ESTIMATION_DECKS } from "@/constants/decks";
import { useDemoStore } from "@/stores/demo-store";

function PlanningPokerRoomContent() {
  const params = useParams<{ roomId: string }>();
  const rooms = useDemoStore((state) => state.rooms);
  const room = rooms.find((item) => item.id === params.roomId) ?? rooms[0];
  const selectVote = useDemoStore((state) => state.selectVote);
  const reveal = useDemoStore((state) => state.reveal);
  const reset = useDemoStore((state) => state.reset);
  const changeStory = useDemoStore((state) => state.changeStory);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const numericVotes = useMemo(
    () => room?.revealed ? room.participants.map((participant) => Number(participant.vote)).filter((vote) => Number.isFinite(vote)) : [],
    [room],
  );
  if (!room) return <div className="p-8">Room not found.</div>;

  const story = room.stories[room.currentStoryIndex];
  const cards = room.deck === "Custom" ? room.customCards : ESTIMATION_DECKS[room.deck];
  const currentParticipant = room.participants.find((participant) => participant.id === "p1");
  const selectedVote = currentParticipant?.vote;
  const average = numericVotes.length ? numericVotes.reduce((sum, vote) => sum + vote, 0) / numericVotes.length : null;
  const sorted = [...numericVotes].sort((a, b) => a - b);
  const median = sorted.length ? (sorted.length % 2 ? sorted[Math.floor(sorted.length / 2)] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2) : null;

  async function copyInvite() {
    await navigator.clipboard?.writeText(`${window.location.origin}/join/${room.code}`);
    setCopied(true);
    toast.success("Invitation link copied");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block"><span className="grid size-8 place-items-center rounded-lg bg-indigo-600 text-xs font-semibold text-white">PP</span></Link>
            <button className="sm:hidden" aria-label="Open participants" onClick={() => setDrawerOpen(true)}><Menu className="size-5" /></button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold sm:text-base">{room.name}</h1>
              <p className="text-xs text-zinc-500">{room.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 sm:flex dark:bg-emerald-950 dark:text-emerald-300"><Wifi className="size-3" />Connected</span>
            <Button variant="ghost" size="icon" aria-label="Copy invitation link" onClick={copyInvite}>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</Button>
            <Link href={`/rooms/${room.id}/settings`}><Button variant="ghost" size="icon" aria-label="Room settings"><Settings className="size-4" /></Button></Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-7">
          <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 xl:block">
              <p className="px-2 py-2 text-xs font-medium text-zinc-500">Stories · {room.stories.length}</p>
              <div className="space-y-1">
                {room.stories.map((item, index) => (
                  <button key={item.id} onClick={() => changeStory(room.id, index)} className={`w-full rounded-lg px-3 py-2.5 text-left ${index === room.currentStoryIndex ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}>
                    <span className="block text-xs text-zinc-400">Story {index + 1}</span><span className="mt-1 block truncate text-sm font-medium">{item.title}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Story {room.currentStoryIndex + 1} of {room.stories.length}</p>
                    <h2 className="mt-2 text-xl font-semibold">{story.title}</h2>
                  </div>
                  <span className="shrink-0 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300">{room.revealed ? "Revealed" : "Voting"}</span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">{story.description}</p>
                {story.acceptanceCriteria.length > 0 && (
                  <div className="mt-5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Acceptance criteria</p>
                    <ul className="mt-2 space-y-1.5">
                      {story.acceptanceCriteria.map((criterion) => <li key={criterion} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"><Check className="size-3.5 text-emerald-500" />{criterion}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Choose your estimate</h3>
                  {selectedVote ? <span className="text-xs font-medium text-emerald-600">Vote submitted</span> : <span className="text-xs text-zinc-500">{room.participants.filter((participant) => participant.role !== "observer").length} voters</span>}
                </div>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:px-0 lg:grid-cols-6 xl:grid-cols-8">
                  {cards.map((card) => (
                    <button
                      key={card}
                      aria-label={`Estimate ${card}`}
                      aria-pressed={selectedVote === card}
                      onClick={() => selectVote(room.id, card)}
                      className={`grid aspect-[3/4] w-20 shrink-0 place-items-center rounded-xl border-2 text-xl font-semibold sm:w-auto ${selectedVote === card ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm ring-2 ring-indigo-100 dark:bg-indigo-950 dark:ring-indigo-900" : "border-zinc-200 bg-white text-zinc-800 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"}`}
                    >{card}</button>
                  ))}
                  <button onClick={() => selectVote(room.id, "Pass")} className={`grid aspect-[3/4] w-20 shrink-0 place-items-center rounded-xl border-2 text-sm font-medium sm:w-auto ${selectedVote === "Pass" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900"}`}>Pass</button>
                </div>
              </div>

              {room.revealed && (
                <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="font-medium">Results</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Average", average?.toFixed(1) ?? "—"],
                      ["Median", median ?? "—"],
                      ["Minimum", numericVotes.length ? Math.min(...numericVotes) : "—"],
                      ["Maximum", numericVotes.length ? Math.max(...numericVotes) : "—"],
                    ].map(([label, value]) => <div key={label} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800"><p className="text-xs text-zinc-500">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>)}
                  </div>
                  <div className="mt-4 space-y-2">
                    {room.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between text-sm"><span className="text-zinc-600 dark:text-zinc-400">{participant.name}</span><span className="font-semibold">{participant.vote ?? "—"}</span></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="hidden border-l border-zinc-200 bg-white px-5 py-6 dark:border-zinc-800 dark:bg-zinc-950 lg:block">
          <div className="flex items-center justify-between"><h2 className="font-medium">Participants</h2><span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800">{room.participants.length}</span></div>
          <div className="mt-4 space-y-2">
            {room.participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3 rounded-lg p-2">
                <div className="relative grid size-9 place-items-center rounded-full bg-zinc-100 text-xs font-semibold dark:bg-zinc-800">{participant.initials}<span className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white dark:border-zinc-950 ${participant.online ? "bg-emerald-500" : "bg-zinc-400"}`} /></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{participant.name}</p><p className="text-xs capitalize text-zinc-500">{participant.role}</p></div>
                {participant.vote ? <span className="grid size-7 place-items-center rounded-md bg-indigo-50 text-xs font-semibold text-indigo-700 dark:bg-indigo-950">✓</span> : <span className="size-2 rounded-full bg-zinc-300" />}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <footer className="sticky bottom-0 z-30 border-t border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-2">
          <div className="flex gap-1">
            <Button variant="secondary" size="icon" disabled={room.currentStoryIndex === 0} aria-label="Previous story" onClick={() => changeStory(room.id, room.currentStoryIndex - 1)}><ChevronLeft className="size-4" /></Button>
            <Button variant="secondary" size="icon" disabled={room.currentStoryIndex === room.stories.length - 1} aria-label="Next story" onClick={() => changeStory(room.id, room.currentStoryIndex + 1)}><ChevronRight className="size-4" /></Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="hidden sm:inline-flex" onClick={() => reset(room.id)}><RotateCcw className="size-4" />Reset</Button>
            {room.revealed ? (
              <Button onClick={() => reset(room.id)}>New round</Button>
            ) : (
              <Button onClick={() => reveal(room.id)}>Reveal votes</Button>
            )}
          </div>
        </div>
      </footer>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Participants">
          <button className="absolute inset-0 bg-black/30" aria-label="Close participants" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-80 bg-white p-5 shadow-xl dark:bg-zinc-950">
            <div className="flex items-center justify-between"><h2 className="font-medium">Participants</h2><Button variant="ghost" size="icon" aria-label="Close" onClick={() => setDrawerOpen(false)}>×</Button></div>
            <div className="mt-5 space-y-2">{room.participants.map((participant) => <div key={participant.id} className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-zinc-100 text-xs font-semibold dark:bg-zinc-800">{participant.initials}</span><div><p className="text-sm font-medium">{participant.name}</p><p className="text-xs text-zinc-500">{participant.role}</p></div></div>)}</div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default function PlanningPokerRoomPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-zinc-500">Loading room…</div>}>
      <PlanningPokerRoomContent />
    </Suspense>
  );
}
