import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "..", "screenshots");
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

console.log("Navigating to localhost:5173...");
await page.goto("http://localhost:5173", { waitUntil: "domcontentloaded", timeout: 15000 });
console.log("Page loaded. Title:", await page.title());

await page.waitForTimeout(1000);
console.log("Clicking Launch Game...");

const btn = page.locator("button", { hasText: "Launch Game" });
await btn.waitFor({ state: "visible", timeout: 5000 });
await btn.click();
console.log("Clicked.");

await page.waitForTimeout(3000);

const canvases = await page.locator("canvas").count();
console.log("Canvas count:", canvases);

const ss1 = path.join(outputDir, "step1_after_click.png");
await page.screenshot({ path: ss1 });
console.log("Screenshot saved to:", ss1);

await browser.close();
