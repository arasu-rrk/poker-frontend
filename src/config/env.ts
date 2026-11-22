export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Planning Poker",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8787",
  wsBaseUrl: process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:8787",
  demoMode: process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE !== "false",
};
