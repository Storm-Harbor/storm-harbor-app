# Storm Harbor website and transitional application

Read the shared [engineering guidance](https://github.com/Storm-Harbor/.github/blob/master/AGENTS.md) and its three specifications. In the full workspace, the same guidance is available at `../../.github/AGENTS.md`.

This repository owns the public website and a legacy Next.js authentication/BFF scaffold. Go 1.26.x is the official target for application runtimes. The website is static HTML/CSS/JavaScript; Node.js 26.6.0 and Yarn 4.18.0 PnP are currently build tools. Do not claim the legacy app is migrated or deploy it through Pages.

Maintain all configured website locales and catalog/interpolation parity. The website currently supports 25 public locales, including right-to-left Arabic, Hebrew and Urdu. Technical repository documentation is English. Preserve explicit locale URLs and user storage behavior. The public build must exclude API, auth and customer-console routes and hide unavailable sign-in links. Treat dashboards as synthetic previews. New public locales may retain documented English fallback for the unqualified transitional authenticated scaffold; do not claim that scaffold is fully localized or production-ready.

Use the owning issue, Storm Harbor Project #1, issue branch and manually reviewed/merged PR. The default/integration branch is `develop`; production is `master`. New issue branches start from fetched/updated `master` and target `develop`. Only a separate same-repository `develop` PR may target `master`. Pages publication is master-only; develop validates without deploying. Keep pre-existing `next-env.d.ts` changes out of the delivery. Generated files and `._*` metadata are not source.

Relevant commands: `yarn check`, `yarn build:website`, `yarn check:website`, `yarn test:website`. `PAGES_BASE_PATH` and `WEBSITE_URL` select hosting paths. Browser acceptance must run against the final static output. Record source-coverage gaps of the legacy authenticated app in its Go migration; static publication does not qualify that application.
