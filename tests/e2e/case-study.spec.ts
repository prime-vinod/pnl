import { test, expect } from "@playwright/test";

test("navigates to case study and renders MDX", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("link", { name: /SportsGrid Web/ }).first().click();
  await expect(page).toHaveURL(/\/work\/sportsgrid-web/);
  await expect(page.getByRole("heading", { name: /SportsGrid Web/ })).toBeVisible();
  await expect(page.getByText("sports-focused web application")).toBeVisible();
});
