import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-none rounded-lg border border-zinc-300 bg-[var(--input-background)] px-3 py-2.5 text-sm text-[var(--input-text)] caret-indigo-600 outline-none placeholder:text-[var(--input-placeholder)] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-zinc-100 dark:border-zinc-700 dark:caret-indigo-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-950 dark:disabled:bg-zinc-900",
        className,
      )}
      {...props}
    />
  );
}
