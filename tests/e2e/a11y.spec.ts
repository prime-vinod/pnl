import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/work/sportsgrid-web"]) {
  test(`a11y: ${path}`, async ({ page }) => {
    // Reduced motion makes the Reveal/transition primitives render their
    // final (opacity:1) state immediately, so axe measures real contrast
    // rather than mid-animation composited colors.
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
