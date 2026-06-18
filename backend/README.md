# Kobo — Backend

NestJS API powering the Kobo USSD Stellar wallet. Handles USSD session state, wallet management, Stellar payments, and SMS notifications.

---

## Stack

- **Runtime:** Node.js 20+
- **Framework:** NestJS 11 + TypeScript
- **Storage:** PostgreSQL (wallets & accounts) + Redis (USSD session state)
- **Blockchain:** `@stellar/stellar-sdk` → Stellar Testnet / Mainnet
- **USSD gateway:** Africa's Talking
- **Package manager:** pnpm

---

## Project Structure

```
src/
├── ussd/        # USSD menu flows and session state machine
├── wallet/      # Account creation, encrypted keystore, PIN auth
├── stellar/     # SDK wrappers: balances, payments, Friendbot funding
├── sms/         # SMS notification adapters (Africa's Talking)
└── main.ts      # Application entrypoint
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL 14+
- Redis
- [Africa's Talking](https://account.africastalking.com) sandbox account

### Install

```bash
pnpm install
```

### Environment

```bash
cp .env.example .env
```

Key variables to set in `.env`:

```env
# Africa's Talking
AT_API_KEY=
AT_USERNAME=
AT_SHORTCODE=

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kobo

# Redis
REDIS_URL=redis://localhost:6379

# Stellar
STELLAR_NETWORK=testnet          # testnet | mainnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Security
KEYSTORE_ENCRYPTION_KEY=         # 32-byte hex secret for keystore encryption
```

### Database

```bash
pnpm run db:migrate
```

### Run

```bash
# Development (watch mode)
pnpm run start:dev

# Production
pnpm run build
pnpm run start:prod
```

---

## USSD Webhook

Africa's Talking posts to `POST /ussd` on every session event. In local development, expose the endpoint with a tunnel:

```bash
npx localtunnel --port 3000
```

Then set the callback URL in your Africa's Talking sandbox to `https://<your-tunnel>/ussd`.

---

## Scripts

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `pnpm run start:dev`  | Start in watch mode                      |
| `pnpm run build`      | Compile to `dist/`                       |
| `pnpm run start:prod` | Run compiled build                       |
| `pnpm run lint`       | Lint and auto-fix with ESLint + Prettier |
| `pnpm run format`     | Format source files with Prettier        |
| `pnpm run test`       | Run unit tests                           |
| `pnpm run test:cov`   | Run tests with coverage report           |
| `pnpm run test:e2e`   | Run end-to-end tests                     |

---

## Security Model

Feature phones cannot safely hold private keys, so Kobo uses an **encrypted custodial keystore**:

1. A Stellar keypair is generated server-side on account creation.
2. The private key is encrypted with a key derived from the user's PIN + a server secret before being stored in PostgreSQL.
3. Every signing operation requires the user to supply their PIN, which decrypts the key in memory for the duration of the request only.

Self-custody key export is on the roadmap.
