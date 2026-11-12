import {expect, test} from "@playwright/test";
import {readFile} from "node:fs/promises";
import {localeDirection, locales, localeStorageKey} from "../../i18n/config";

for (const locale of locales) {
  test(`public journey renders ${locale} with styles and no authenticated entry points`, async ({page, baseURL}) => {
    const messages = JSON.parse(await readFile(`messages/${locale}.json`, "utf8"));
    const failures: string[] = [];
    page.on("pageerror", error => failures.push(error.message));
    page.on("response", response => {
      if (response.status() >= 400 && new URL(response.url()).origin === new URL(baseURL!).origin) failures.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(new URL(`${locale}/`, baseURL).href);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", localeDirection(locale));
    await expect(page.locator("body")).not.toContainText(/iot\.?erax/i);
    await expect(page.locator('a[href*="ioterax.com"]')).toHaveCount(0);
    await expect(page.getByRole("heading", {level: 1})).toContainText(messages.hero.title);
    await expect(page.getByRole("heading", {name: messages.platform.title, exact: true})).toBeVisible();
    await expect(page.getByRole("link", {name: messages.auth.signIn, exact: true})).toHaveCount(0);
    await expect(page.locator("main")).toHaveCSS("background-color", "rgb(17, 24, 32)");
    await expect(page.locator("header nav")).toBeVisible();
    await expect(page.locator("header nav")).toHaveCSS("display", "flex");
    await expect.poll(() => page.evaluate(key => localStorage.getItem(key), localeStorageKey)).toBe(locale);
    expect(failures).toEqual([]);
  });
}

test("language selection works on static hosting and explicit URLs override stored preferences", async ({page, baseURL}) => {
  const english = JSON.parse(await readFile("messages/en-GB.json", "utf8"));
  await page.goto(new URL("en-GB/", baseURL).href);
  await page.getByRole("button", {name: english.language.choose, exact: true}).click();
  await page.getByRole("menuitem", {name: english.language["pt-BR"]}).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), localeStorageKey)).toBe("pt-BR");
  await page.goto(new URL("fr-FR/", baseURL).href);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr-FR");
  await expect.poll(() => page.evaluate(key => localStorage.getItem(key), localeStorageKey)).toBe("fr-FR");
});

for (const locale of ["ar", "he-IL", "ur-PK", "hi-IN", "zh-Hans", "ja-JP"]) {
  test(`mobile layout and scrolling language selector work in ${locale}`, async ({page, baseURL}) => {
    const messages = JSON.parse(await readFile(`messages/${locale}.json`, "utf8"));
    await page.setViewportSize({width: 390, height: 844});
    await page.goto(new URL(`${locale}/`, baseURL).href);
    await page.getByRole("button", {name: messages.nav.openMenu, exact: true}).click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();
    await page.locator("#mobile-navigation").getByRole("link", {name: messages.nav.product, exact: false}).click();
    await expect(page.locator("#mobile-navigation")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("button", {name: messages.language.choose, exact: true}).click();
    await expect(page.getByRole("menuitem")).toHaveCount(locales.length);
    const dropdown = page.getByRole("menu");
    await expect(dropdown).toHaveCSS("overflow-y", "auto");
    await expect.poll(async () => {
      const bounds = await dropdown.boundingBox();
      return Boolean(bounds && bounds.x >= 0 && bounds.y >= 0 &&
        bounds.x + bounds.width <= 390 && bounds.y + bounds.height <= 844);
    }).toBe(true);
    await page.keyboard.press("End");
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("lang", "vi-VN");
  });
}

test("root language selection respects Simplified Chinese script", async ({browser, baseURL}) => {
  for (const [requested, expected] of [["zh-CN", "zh-Hans"], ["zh-TW", "en-GB"], ["he-IL", "he-IL"]]) {
    const context = await browser.newContext({locale: requested});
    try {
      const page = await context.newPage();
      await page.goto(baseURL!);
      await expect(page.locator("html")).toHaveAttribute("lang", expected);
    } finally { await context.close(); }
  }
});

test("root entry resolves browser language and mobile navigation closes after selection", async ({browser, baseURL}) => {
  const context = await browser.newContext({locale: "pt-BR", viewport: {width: 390, height: 844}});
  const page = await context.newPage();
  try {
    const messages = JSON.parse(await readFile("messages/pt-BR.json", "utf8"));
    await page.goto(baseURL!);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await page.getByRole("button", {name: messages.nav.openMenu, exact: true}).click();
    const navigation = page.locator("#mobile-navigation");
    await expect(navigation).toBeVisible();
    await navigation.getByRole("link", {name: messages.nav.product, exact: false}).click();
    await expect(navigation).toHaveCount(0);
    await expect(page).toHaveURL(/#product$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } finally {
    await context.close();
  }
});

test("unknown and authenticated paths return 404", async ({request, baseURL}) => {
  for (const path of ["missing/", "en-GB/login/", "en-GB/console/", "api/auth/login/"]) {
    const response = await request.get(new URL(path, baseURL).href);
    expect(response.status()).toBe(404);
  }
});
