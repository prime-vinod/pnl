import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
});

test("landing renders hero + featured work + cta", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /SOFTWARE DEVELOPER/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /CRM Platform/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /LET'S BUILD/i })).toBeVisible();
});
