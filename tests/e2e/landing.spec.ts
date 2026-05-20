import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
});

test("landing renders hero + featured work + cta", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /FRONTEND DEVELOPER/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /SportsGrid Web/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /LET'S BUILD/i })).toBeVisible();
});
