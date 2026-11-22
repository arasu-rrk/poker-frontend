# Planning Poker Frontend

A production-oriented Next.js frontend for real-time agile estimation sessions. It uses deterministic demo mode by default, with centralized REST and WebSocket integration points for a separately deployed backend.

## Stack

- Next.js App Router, React, and strict TypeScript
- Tailwind CSS, Radix UI primitives, and Lucide icons
- Zustand, TanStack Query, React Hook Form, and Zod
- Native WebSocket client with reconnection and validated envelopes
- Vitest, Testing Library, and Playwright
- Cloudflare OpenNext deployment

## Requirements

- Node.js 22 LTS
- pnpm 12+

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

## Demo mode

Demo mode is enabled with `NEXT_PUBLIC_ENABLE_DEMO_MODE=true`. It includes room creation and joining, sample participants and stories, estimation decks, hidden voting, reveal/reset workflows, and story navigation.

No backend is required for local demo mode.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_NAME` | Public application name |
| `NEXT_PUBLIC_APP_URL` | Canonical frontend URL |
| `NEXT_PUBLIC_API_BASE_URL` | REST backend origin |
| `NEXT_PUBLIC_WS_BASE_URL` | WebSocket backend origin |
| `NEXT_PUBLIC_ENABLE_DEMO_MODE` | Enables mock adapters |
| `NEXT_PUBLIC_ENABLE_GOOGLE_LOGIN` | Enables Google authentication UI |
| `NEXT_PUBLIC_ENABLE_MICROSOFT_LOGIN` | Enables Microsoft authentication UI |

Never put secrets in `NEXT_PUBLIC_*` variables.

## Backend integration

REST methods are centralized in `src/services/api/api-client.ts`. The proposed API contract uses `/api/v1` routes and zod schemas for room form validation.

The WebSocket client is in `src/services/websocket/websocket-client.ts`. It validates versioned envelopes, reconnects with exponential backoff and jitter, supports duplicate-subscription prevention, and exposes outgoing commands.

## Commands

```bash
pnpm dev
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
pnpm format
pnpm preview
pnpm deploy
```

## Cloudflare deployment

Configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the Cloudflare CLI or GitHub Actions secrets. Set public variables in `wrangler.jsonc` or the Cloudflare dashboard.

The repository includes `wrangler.jsonc`, `open-next.config.ts`, and a GitHub Actions deployment workflow.

## Architecture

- `src/app`: App Router pages
- `src/components`: shared layout and UI components
- `src/services`: REST and WebSocket adapters
- `src/stores`: temporary Zustand UI state
- `src/constants` and `src/types`: shared decks and domain types
- `tests/unit` and `tests/e2e`: automated tests
