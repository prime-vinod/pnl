import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
});

test("contact form shows status without secrets", async ({ page }) => {
  await page.goto("/about#contact");
  await page.getByLabel("Name").fill("Vinod");
  await page.getByLabel("Email").fill("v@example.com");
  await page.getByLabel("Message").fill("Hello, I would like to discuss a project with you.");
  await page.getByRole("button", { name: /Send/ }).click();
  await expect(page.getByRole("status")).toContainText(/temporarily unavailable|sent/i);
});
