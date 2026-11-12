import assert from "node:assert/strict";
import {access, readdir, readFile} from "node:fs/promises";
import {resolve} from "node:path";
import {locales} from "../i18n/config.ts";

const output = resolve(import.meta.dirname, "../website/out");
const files = await readdir(output, {recursive: true});
assert.ok(!files.some(file => file.split(/[/\\]/).some(part => part.startsWith("._"))), "filesystem metadata must not be published");
assert.ok(files.includes("index.html"), "root language entry point must exist");
assert.ok(files.includes("404.html"), "unknown routes must have a real 404 page");
assert.ok(files.includes("sitemap.xml"));
assert.ok(files.includes("robots.txt"));
assert.ok(files.includes(".nojekyll"));
assert.ok(!files.some(file => /(^|[/\\])(api|console|login|register|mfa|verify-email)([/\\.]|$)/.test(file)), "private and authentication routes must not be exported");
for (const locale of locales) {
  const html = await readFile(resolve(output, locale, "index.html"), "utf8");
  assert.ok(html.includes(`lang="${locale}"`), `${locale}: language must match the URL`);
  assert.ok(html.includes("Storm Harbor") && html.includes("DigitalOcean"), `${locale}: product and multicloud content must be rendered`);
  assert.ok(!/href="[^"]*\/(login|console)(\/|\")/.test(html), `${locale}: public site must not advertise unavailable authentication`);
  for (const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g)) {
    const pathname = match[1];
    if (!pathname.includes("/_next/") && !pathname.endsWith("/logo.png")) continue;
    const asset = pathname.slice(pathname.indexOf("/_next/") >= 0 ? pathname.indexOf("/_next/") + 1 : pathname.lastIndexOf("/") + 1);
    await access(resolve(output, decodeURIComponent(asset)));
  }
}
console.log(`Validated ${locales.length} public locales, assets, entry point and exclusion of authenticated routes.`);
