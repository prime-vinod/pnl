import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("first visit shows the intro, then reveals the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toBeVisible();
  await expect(page.getByRole("heading", { name: /SOFTWARE DEVELOPER/i })).toBeVisible();
  await expect(page.getByTestId("intro-preloader")).toBeHidden({ timeout: 6000 });
});

test("intro has no axe violations while visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toBeVisible();
  // Scope axe to the overlay element only: the hero behind it is still in a
  // mid-animation composited state (opacity < 1) when the overlay is showing,
  // so scanning the full page produces spurious contrast failures on hero text
  // that is not yet user-visible. The overlay itself is what this test guards.
  const results = await new AxeBuilder({ page })
    .include("[data-testid='intro-preloader']")
    .analyze();
  expect(results.violations).toEqual([]);
});

test("intro is skipped on a same-session reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toBeHidden({ timeout: 6000 });
  await page.reload();
  await expect(page.getByTestId("intro-preloader")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /SOFTWARE DEVELOPER/i })).toBeVisible();
});

test("intro is skipped under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("intro-preloader")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /SOFTWARE DEVELOPER/i })).toBeVisible();
});
