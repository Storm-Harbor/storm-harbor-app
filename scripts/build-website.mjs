import {cp, mkdir, readFile, readdir, readlink, symlink, unlink, writeFile} from "node:fs/promises";
import {createRequire} from "node:module";
import {resolve} from "node:path";
import {spawnSync} from "node:child_process";
import {defaultLocale, locales, localeStorageKey} from "../i18n/config.ts";

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, "..");
const basePath = process.env.PAGES_BASE_PATH || "";
if (basePath && !/^\/[a-zA-Z0-9_-]+$/.test(basePath)) {
  throw new Error("PAGES_BASE_PATH must be empty or a single repository path");
}
const siteUrl = new URL(process.env.WEBSITE_URL || `https://storm-harbor.github.io${basePath}/`);
siteUrl.pathname = `${siteUrl.pathname.replace(/\/$/, "")}/`;
if (siteUrl.protocol !== "https:") throw new Error("WEBSITE_URL must use HTTPS");

await mkdir(resolve(root, "website/public"), {recursive: true});
await cp(resolve(root, "public/logo.png"), resolve(root, "website/public/logo.png"));
const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build", ".", "--webpack"], {
  cwd: resolve(root, "website"),
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_STATIC_WEBSITE: "true",
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl.href,
    NEXT_TELEMETRY_DISABLED: "1",
  },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

const output = resolve(root, "website/out");
if (basePath) {
  const preview = resolve(root, "website/preview");
  await mkdir(preview, {recursive: true});
  const target = resolve(preview, basePath.slice(1));
  try {
    await symlink("../out", target);
  } catch (error) {
    if (error.code !== "EEXIST" || await readlink(target) !== "../out") throw error;
  }
}
const defaultMessages = JSON.parse(await readFile(resolve(root, `messages/${defaultLocale}.json`), "utf8"));
const languageLinks = await Promise.all(locales.map(async (locale) => {
  const messages = JSON.parse(await readFile(resolve(root, `messages/${locale}.json`), "utf8"));
  return `<li><a href="${basePath}/${locale}/" lang="${locale}">${messages.language[locale]}</a></li>`;
}));
await writeFile(resolve(output, "index.html"), `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Storm Harbor</title>
<meta name="description" content="Declarative multicloud recovery for private projects."><link rel="icon" href="${basePath}/logo.png">
<style>body{font:1rem system-ui;background:#111820;color:#fff;max-width:40rem;margin:12vh auto;padding:2rem}a{color:#84a7ef}li{margin:.7rem 0}</style></head>
<body><h1>Storm Harbor</h1><p>${defaultMessages.language.choose}</p><ul>${languageLinks.join("")}</ul>
<script>(()=>{const locales=${JSON.stringify(locales)};let saved;try{saved=localStorage.getItem(${JSON.stringify(localeStorageKey)})}catch{}const browser=navigator.languages||[navigator.language];const preferred=locales.includes(saved)?saved:browser.map(l=>locales.find(x=>x.toLowerCase()===l.toLowerCase())||locales.find(x=>x.split('-')[0]===l.split('-')[0])).find(Boolean)||${JSON.stringify(defaultLocale)};location.replace(${JSON.stringify(basePath)}+'/'+preferred+'/'+location.search+location.hash)})();</script>
</body></html>`);
await writeFile(resolve(output, ".nojekyll"), "");
await writeFile(resolve(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", siteUrl).href}\n`);
await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locales.map(locale => `<url><loc>${new URL(`${locale}/`, siteUrl).href}</loc></url>`).join("")}</urlset>`);
async function removeFilesystemMetadata(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isFile() && entry.name.startsWith("._")) await unlink(path);
    else if (entry.isDirectory()) await removeFilesystemMetadata(path);
  }
}
await removeFilesystemMetadata(output);
console.log(`Static website ready at ${output}`);
