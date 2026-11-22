"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components/layout/app-header";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto flex max-w-md px-4 py-16 sm:py-24">
        <div className="w-full">
          <h1 className="text-2xl font-semibold">Welcome to Planning Poker</h1>
          <p className="mt-2 text-sm text-zinc-500">Continue as a guest or use a connected account.</p>
          <Button className="mt-8 w-full" onClick={() => router.push("/dashboard")}>Continue as guest</Button>
          <div className="my-6 flex items-center gap-3 text-xs text-zinc-400"><span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />or<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" /></div>
          <Button variant="secondary" className="w-full" disabled>Continue with Google</Button>
          <Button variant="secondary" className="mt-3 w-full" disabled>Continue with Microsoft</Button>
          <form className="mt-6 space-y-3" onSubmit={(event) => { event.preventDefault(); router.push("/dashboard"); }}>
            <label className="block text-sm font-medium" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="you@company.com" />
            <Button type="submit" variant="secondary" className="w-full">Continue with email</Button>
          </form>
          <Link href="/" className="mt-6 block text-center text-sm text-zinc-500 hover:text-zinc-900">Back to home</Link>
        </div>
      </main>
    </div>
  );
}
