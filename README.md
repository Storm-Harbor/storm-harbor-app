# Storm Harbor

Product website for **Storm Harbor Control Plane**, an open-source continuous
disaster-recovery readiness platform by iot.Erax.

## Requirements

- Node.js 26.6.0
- Yarn 4 with Plug'n'Play

## Development

```bash
nvm use
yarn install
yarn dev
```

The app is built with Next.js 16, React 19, Tailwind CSS 4, and `next-intl`.
All ten supported locales live under `messages/` and are validated for key
parity during `yarn check`.
