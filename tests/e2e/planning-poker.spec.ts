import { test, expect } from "@playwright/test";

test("create and reveal a vote in demo mode", async ({ page }) => {
  await page.goto("/rooms/create");
  await page.getByLabel("Room name").fill("Release planning");
  await page.getByRole("button", { name: "Create room" }).click();
  await expect(page).toHaveURL(/\/rooms\/room-/);
  await page.getByRole("button", { name: "Estimate 5" }).click();
  await expect(page.getByText("Vote submitted")).toBeVisible();
  await page.getByRole("button", { name: "Reveal votes" }).click();
  await expect(page.getByText("Results")).toBeVisible();
  await expect(page.getByText("Average")).toBeVisible();
});
