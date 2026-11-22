"use client";

import Link from "next/link";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const [dark, setDark] = useState(() =>
    typeof window === "undefined"
      ? false
      : document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark",
  );
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-indigo-600 text-sm text-white">PP</span>
          <span>Planning Poker</span>
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Link href="/login" aria-label="Profile"><Button variant="ghost" size="icon"><CircleUserRound className="size-5" /></Button></Link>
        </div>
      </div>
    </header>
  );
}
