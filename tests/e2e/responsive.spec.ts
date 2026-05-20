import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.sessionStorage.setItem("intro-seen", "1"));
});

const routes = ["/", "/work", "/work/sportsgrid-web", "/work/oterra", "/writing", "/writing/figma-to-react", "/about", "/nope-404"];
const viewports = [
  { name: "iphone-se", width: 375, height: 667 },
  { name: "pixel", width: 360, height: 800 },
  { name: "ipad", width: 768, height: 1024 },
];

for (const vp of viewports) {
  for (const path of routes) {
    test(`no horizontal overflow ${vp.name} ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return { scroll: de.scrollWidth, client: de.clientWidth };
      });
      // allow 1px rounding slack
      expect(overflow.scroll).toBeLessThanOrEqual(overflow.client + 1);
    });
  }
}
