import assert from "node:assert/strict";
import {test} from "node:test";
import {localeDirection, matchBrowserLocale} from "../i18n/config.ts";

test("browser language selection preserves script and accepts canonical language aliases", () => {
  const cases = {
    "zh": "zh-Hans", "zh-CN": "zh-Hans", "zh-SG": "zh-Hans", "zh-Hans": "zh-Hans",
    "zh-TW": null, "zh-HK": null, "zh-Hant": null,
    "iw-IL": "he-IL", "he": "he-IL", "ur": "ur-PK", "ar-EG": "ar",
    "uk": "uk-UA", "et": "et-EE", "pl": "pl-PL", "bg": "bg-BG", "hi": "hi-IN",
    "ja": "ja-JP", "af": "af-ZA", "ko": "ko-KR", "tr": "tr-TR", "id": "id-ID", "vi": "vi-VN",
    "pt-BR": "pt-BR", "fr-CA": "fr-FR", "en-AU": "en-GB", "invalid_locale": null,
  };
  for (const [requested, expected] of Object.entries(cases)) {
    assert.equal(matchBrowserLocale(requested), expected, requested);
  }
});

test("Arabic, Hebrew and Urdu use right-to-left presentation independently of other locales", () => {
  for (const locale of ["ar", "ar-EG", "he-IL", "ur-PK"]) assert.equal(localeDirection(locale), "rtl");
  for (const locale of ["en-GB", "hi-IN", "zh-Hans", "ja-JP", "af-ZA", "uk-UA"]) assert.equal(localeDirection(locale), "ltr");
});
