# Storm Harbor

Public website and authenticated control panel for **Storm Harbor**, an
open-source continuous disaster-recovery platform by
[iot.EraX](https://ioterax.com).

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
All ten supported locales live under `messages/` and are validated for key
parity during `yarn check`.

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
