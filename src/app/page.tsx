import Link from "next/link";
import { ArrowRight, Check, Layers3, ShieldCheck, Users } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <AppHeader />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_520px] lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
              <span className="size-1.5 rounded-full bg-indigo-500" />
              Built for focused refinement sessions
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Estimate together.<br />
              <span className="text-indigo-600">Decide with confidence.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Planning Poker gives your team a clear, distraction-free way to discuss work and reach estimates in real time.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/rooms/create"><Button size="lg" className="w-full sm:w-auto">Start Planning Poker <ArrowRight className="size-4" /></Button></Link>
              <Link href="/join/demo"><Button size="lg" variant="secondary" className="w-full sm:w-auto">Join a Room</Button></Link>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-xl shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-500">Core product refinement</p>
                  <h2 className="mt-1 font-semibold">Add team member invitations</h2>
                </div>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Voting</span>
              </div>
              <div className="mt-6 grid grid-cols-6 gap-2">
                {[1, 2, 3, 5, 8, 13].map((card) => (
                  <div key={card} className={`grid aspect-[3/4] place-items-center rounded-lg border text-lg font-semibold ${card === 5 ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100 dark:bg-indigo-950 dark:ring-indigo-900" : "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"}`}>{card}</div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex -space-x-2">
                  {["AM", "PS", "ML"].map((name) => <span key={name} className="grid size-8 place-items-center rounded-full border-2 border-white bg-zinc-200 text-[10px] font-semibold dark:border-zinc-950 dark:bg-zinc-700">{name}</span>)}
                </div>
                <span className="text-xs text-zinc-500">3 of 4 voted</span>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-zinc-100 bg-zinc-50/60 dark:border-zinc-900 dark:bg-zinc-900/30">
          <div className="mx-auto grid max-w-7xl gap-px px-4 sm:grid-cols-3 sm:px-6">
            {[
              [Layers3, "Flexible decks", "Use Fibonacci, T-shirt sizing, or build a deck for your team."],
              [Users, "Real-time rooms", "Invite teammates and see every vote and participant update live."],
              [ShieldCheck, "Calm by default", "Hidden ballots prevent anchoring until the moderator reveals results."],
            ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof Layers3;
              return <article key={title as string} className="py-8 sm:px-8 sm:first:pl-0">
                <FeatureIcon className="size-5 text-indigo-600" />
                <h2 className="mt-4 font-semibold">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{copy as string}</p>
              </article>;
            })}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Create a room", "Vote privately", "Reveal and align"].map((step, index) => (
              <div key={step} className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <span className="grid size-8 place-items-center rounded-full bg-zinc-100 text-xs font-semibold dark:bg-zinc-800">{index + 1}</span>
                <h3 className="mt-4 font-medium">{step}</h3>
                <p className="mt-2 text-sm text-zinc-500">{["Set up a deck and invite your team.", "Choose a card without exposing your vote.", "Discuss the range and record the estimate."][index]}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-sm text-zinc-500 sm:px-6">
          <span>Planning Poker</span>
          <span className="flex items-center gap-1"><Check className="size-3.5" /> Demo ready</span>
        </div>
      </footer>
    </div>
  );
}
