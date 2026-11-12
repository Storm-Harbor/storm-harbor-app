import {expect, test} from "@playwright/test";
import {readFile} from "node:fs/promises";
import {locales, localeStorageKey} from "../../i18n/config";

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
