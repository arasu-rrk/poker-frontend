import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-zinc-300 bg-[var(--input-background)] px-3 text-sm text-[var(--input-text)] caret-indigo-600 outline-none placeholder:text-[var(--input-placeholder)] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 dark:border-zinc-700 dark:caret-indigo-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-950 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600",
        className,
      )}
      {...props}
    />
  );
}
