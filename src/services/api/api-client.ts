import { z } from "zod";
import { appConfig } from "@/config/env";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) {
    throw new ApiError(response.status, "We couldn't complete that request. Please try again.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const roomFormSchema = z.object({
  name: z.string().trim().min(3, "Room name must be at least 3 characters").max(60),
  description: z.string().trim().max(300),
  deck: z.enum(["Fibonacci", "Modified Fibonacci", "T-shirt sizing", "Sequential", "Custom"]),
  allowGuests: z.boolean(),
  requireApproval: z.boolean(),
  enableObservers: z.boolean(),
  customCards: z.array(z.string()).optional(),
});
