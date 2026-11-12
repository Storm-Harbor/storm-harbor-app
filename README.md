# Storm Harbor

Public website and authenticated control panel for **Storm Harbor**, an
open-source declarative multicloud recovery platform.

## Requirements

- Node.js 26.6.0
- Yarn 4.18.0 with Plug'n'Play

## Development

```bash
nvm use
yarn install
yarn dev
```

The app is built with Next.js 16, React 19, Tailwind CSS 4, and `next-intl`.
All twenty-five supported public locales live under `messages/` and are validated
for key and interpolation parity during `yarn check`. Public copy is translated;
new locales retain English fallback for the transitional authenticated scaffold,
which is excluded from the static website and is not qualified by these checks.

## Product direction and runtime boundary

Storm Harbor is designed for any organization and private projects. AWS, Azure,
DigitalOcean, Oracle Cloud and GCP integrate through provider adapters; optional
project-owned AI/RAG/CLI keeps knowledge under the project's control. Versioned
YAML drives the guided journey and extensible resources/controllers.

**Go 1.26.x is the official language/release line for runtime applications,
APIs, controllers/operators, agents, CLIs and SDKs.** The current Next.js
authentication/BFF is a transitional scaffold awaiting a behavior-preserving Go
migration. The public static website uses browser HTML/CSS/JavaScript and
frontend build tools, with no Node.js production server. Production recovery
adapters and the Go runtime are not implemented yet.

Technical documentation remains in English. See the
[platform contract](https://storm-harbor.github.io/storm-harbor-control-plane/architecture/platform-contract/).

## Public website and GitHub Pages

```bash
yarn build:website
yarn check:website
```

`website/app` exposes only the public locale pages and reuses the existing design
and translations. The export at `website/out` contains twenty-five locale directories,
a language-selecting root entry point, assets, a 404 page, robots and sitemap.
Explicit locale URLs retain the chosen language. Authentication APIs, login and
customer console routes are excluded; sign-in links are hidden in this build.

The language selector shows native language names, supports keyboard navigation
and scrolls within the viewport. Arabic, Hebrew and Urdu use right-to-left layout.
`zh-Hans` denotes Simplified Chinese; browser matching respects script, so a
Traditional Chinese preference does not implicitly select Simplified Chinese.
Hindi, Hebrew, Urdu and Afrikaans are the owner-authorized choices for the
country/region requests. Technical documentation stays in English.

`PAGES_BASE_PATH` selects the repository subpath (empty for a custom domain), and
`WEBSITE_URL` sets the absolute HTTPS site URL. The `Website` workflow validates
the existing application and exports/deploys public content after updates to
`develop`; pull requests build and validate without deploying. GitHub Actions
dependencies are pinned by commit SHA.

For `stormharbor.io`, configure the Pages custom domain after DNS points to
GitHub. The apex needs GitHub Pages A records (`185.199.108.153`,
`185.199.109.153`, `185.199.110.153`, `185.199.111.153`) or a supported equivalent;
`www` can CNAME to `storm-harbor.github.io`. Domain verification TXT alone does
not provide website routing. Never put Stripe credentials or customer data in
the static site; sponsorship links must use verified hosted payment URLs.

## Product surfaces

- `/[locale]`: public product website;
- `/[locale]/login`, `/register`, `/verify-email`, and `/mfa`: identity flows;
- `/[locale]/console`: authenticated control-plane experience;
- `/api/auth/*`: backend-for-frontend routes for `api-auth`.

Configure the server-only authentication endpoint through `AUTH_API_URL`; see
`.env.example`. Credentials are proxied to `api-auth`. Access tokens and MFA
challenge identifiers are kept in `HttpOnly` cookies and are never written to
browser storage.

The current console overview contains clearly labelled sample data while the
Storm Harbor runtime APIs are being introduced. Cookie presence in the proxy is
only a navigation gate. Every future BFF route that exposes customer data or
performs recovery work must independently verify the session, tenant,
permission, and applicable policy.
