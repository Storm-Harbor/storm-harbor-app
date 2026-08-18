import {readFile} from "node:fs/promises";
import {resolve} from "node:path";

const locales = [
  "en-GB",
  "en-US",
  "es-ES",
  "ca-ES",
  "pt-PT",
  "pt-BR",
  "it-IT",
  "ru-RU",
  "de-DE",
  "fr-FR",
];

function flattenKeys(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" && !Array.isArray(child)
      ? flattenKeys(child, path)
      : [path];
  });
}

const catalogues = await Promise.all(
  locales.map(async (locale) => {
    const content = await readFile(resolve("messages", `${locale}.json`), "utf8");
    return [locale, new Set(flattenKeys(JSON.parse(content)))];
  }),
);

const [referenceLocale, referenceKeys] = catalogues[0];
let invalid = false;

for (const [locale, keys] of catalogues.slice(1)) {
  const missing = [...referenceKeys].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !referenceKeys.has(key));
  if (missing.length || extra.length) {
    invalid = true;
    console.error(`${locale}: missing [${missing.join(", ")}], extra [${extra.join(", ")}]`);
  }
}

if (invalid) process.exit(1);
console.log(`${locales.length} locale catalogues match ${referenceLocale} (${referenceKeys.size} keys).`);
