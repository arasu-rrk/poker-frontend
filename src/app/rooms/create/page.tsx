"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ESTIMATION_DECKS } from "@/constants/decks";
import { useDemoStore } from "@/stores/demo-store";
import { roomFormSchema } from "@/services/api/api-client";
import type { z } from "zod";

type RoomForm = z.infer<typeof roomFormSchema>;

export default function CreateRoomPage() {
  const router = useRouter();
  const createRoom = useDemoStore((state) => state.createRoom);
  const [deck, setDeck] = useState<RoomForm["deck"]>("Fibonacci");
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RoomForm>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: { name: "", description: "", deck: "Fibonacci", allowGuests: true, requireApproval: false, enableObservers: true, customCards: [] },
  });
  function onSubmit(values: RoomForm) {
    const room = createRoom(values.name, values.description, values.deck, values.customCards ?? ESTIMATION_DECKS[values.deck]);
    toast.success("Room created");
    router.push(`/rooms/${room.id}`);
  }
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold">Create a room</h1>
        <p className="mt-2 text-sm text-zinc-500">Set up an estimation session for your team.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="text-sm font-medium">Room name</label>
            <Input id="name" className="mt-2" placeholder="Core product refinement" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea id="description" className="mt-2" placeholder="What will the team estimate?" {...register("description")} />
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Default estimation deck</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(ESTIMATION_DECKS) as RoomForm["deck"][]).map((option) => (
                <label key={option} className={`cursor-pointer rounded-lg border p-3 text-sm ${deck === option ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950" : "border-zinc-200 dark:border-zinc-800"}`}>
                  <input className="sr-only" type="radio" value={option} {...register("deck")} onChange={() => { setDeck(option); setValue("deck", option); }} />
                  {option}
                </label>
              ))}
            </div>
            {deck !== "Custom" && <p className="mt-3 text-xs text-zinc-500">{ESTIMATION_DECKS[deck].join(" · ")}</p>}
          </fieldset>
          {deck === "Custom" && (
            <div>
              <label htmlFor="customCards" className="text-sm font-medium">Custom cards</label>
              <Input id="customCards" className="mt-2" placeholder="1, 2, 3, 5, 8, ?" onChange={(event) => setValue("customCards", event.target.value.split(",").map((card) => card.trim()).filter(Boolean))} />
            </div>
          )}
          <div className="space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            {([
              ["allowGuests", "Allow guest participants"],
              ["requireApproval", "Require moderator approval"],
              ["enableObservers", "Enable observers"],
            ] as const).map(([name, label]) => (
              <label key={name} className="flex items-center justify-between gap-4 text-sm">
                {label}<input type="checkbox" className="size-4 accent-indigo-600" {...register(name)} />
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <Button type="button" variant="secondary" onClick={() => router.push("/dashboard")}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>Create room</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
