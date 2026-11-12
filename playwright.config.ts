import {defineConfig, devices} from "@playwright/test";

const basePath = process.env.PAGES_BASE_PATH || "";
export default defineConfig({
  testDir: "./test/browser",
  testIgnore: "**/._*",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:4173${basePath}/`,
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? {executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}
      : {},
  },
  webServer: {
    command: `python3 -m http.server 4173 --bind 127.0.0.1 --directory ${basePath ? "website/preview" : "website/out"}`,
    url: `http://127.0.0.1:4173${basePath}/`,
    reuseExistingServer: false,
    stdout: "ignore",
    stderr: "ignore",
  },
});
