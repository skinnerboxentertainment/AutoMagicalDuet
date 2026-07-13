const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleLogs = [];
  page.on("console", (msg) => consoleLogs.push(msg.type() + ": " + msg.text()));

  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.waitForSelector("#encyclopedia", { timeout: 10000 });

  const launchBtn = page.locator(".btn-launch");
  await launchBtn.click();
  await page.waitForSelector("#game-container canvas", { timeout: 5000 });
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: "aspect-screenshot.png",
    fullPage: false,
  });

  const title = await page.title();
  const canvasCount = await page.locator("canvas").count();

  console.log(JSON.stringify({
    title,
    canvasCount,
    logs: consoleLogs,
    screenshots: ["aspect-screenshot.png"],
  }));

  await browser.close();
})().catch((e) => {
  console.error(JSON.stringify({ error: e.message }));
  process.exit(1);
});
