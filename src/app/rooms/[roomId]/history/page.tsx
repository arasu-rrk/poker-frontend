import { AppHeader } from "@/components/layout/app-header";

export default function SessionHistoryPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold">Session history</h1>
        <div className="mt-8 space-y-3">
          {[["Improve command palette", "5"], ["Export sprint report", "8"], ["Add team member invitations", "—"]].map(([title, estimate]) => (
            <div key={title} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"><div><p className="font-medium">{title}</p><p className="mt-1 text-xs text-zinc-500">Estimated this week</p></div><span className="grid size-10 place-items-center rounded-lg bg-zinc-100 font-semibold dark:bg-zinc-800">{estimate}</span></div>
          ))}
        </div>
      </main>
    </div>
  );
}
