import assert from "node:assert/strict";
import {readFile, readdir} from "node:fs/promises";
import {resolve} from "node:path";
import {locales} from "../i18n/config.ts";

function flatten(value, prefix = "") {
  return Object.fromEntries(Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" && !Array.isArray(child)
      ? Object.entries(flatten(child, path)) : [[path, child]];
  }));
}
const files = (await readdir("messages")).filter(name => name.endsWith(".json") && !name.startsWith("._"));
assert.deepEqual(files.sort(), locales.map(code => `${code}.json`).sort(), "Configured locales and catalogs must match.");
const catalogs = await Promise.all(locales.map(async locale => [
  locale, flatten(JSON.parse(await readFile(resolve("messages", `${locale}.json`), "utf8")))
]));
const [referenceLocale, reference] = catalogs[0];
const keys = Object.keys(reference).sort();
const placeholders = text => [...text.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)(?:\s*[,}])/g)].map(match => match[1]).sort();
for (const [locale, catalog] of catalogs) {
  assert.deepEqual(Object.keys(catalog).sort(), keys, `${locale}: catalog keys`);
  for (const key of keys) {
    assert.ok(typeof catalog[key] === "string" && catalog[key].trim(), `${locale}:${key}: non-empty text required`);
    assert.deepEqual(placeholders(catalog[key]), placeholders(reference[key]), `${locale}:${key}: interpolation parity`);
    assert.ok(!/iot\.?erax/i.test(catalog[key]), `${locale}:${key}: corporate reference`);
  }
}
console.log(`${locales.length} locale catalogs match ${referenceLocale} (${keys.length} keys), including interpolation.`);
