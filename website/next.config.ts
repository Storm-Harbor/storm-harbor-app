import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "../i18n/request.ts",
);

export default withNextIntl({
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {unoptimized: true},
  poweredByHeader: false,
  reactStrictMode: true,
});
