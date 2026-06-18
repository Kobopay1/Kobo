Stablecoins have become a financial lifeline across Nigeria and the wider Global South — but every wallet today assumes a smartphone and mobile data. Millions of people bank entirely through USSD shortcodes on feature phones and are shut out of the on-chain economy completely.

Kobo closes that gap by putting a real wallet behind a USSD menu, so anyone with the cheapest phone can send and receive value in seconds — even when their bank's network is down.

---

## Why Stellar

Stellar is purpose-built for exactly this use case. Payments settle in ~5 seconds for a fraction of a cent, which is what makes a sub-dollar remittance or a market-stall payment actually viable over USSD. The network has native USDC and a global anchor network via the SEP standards (SEP-6 / SEP-24 / SEP-31) that provide real fiat on- and off-ramps, and the whole protocol is engineered around financial inclusion and cross-border payments rather than speculation. A phone-number-to-Stellar-address mapping fits Stellar's federation model naturally.

---

## Why Soroban

Soroban — Stellar's Rust-based smart-contract platform — is the programmable layer beneath Kobo. Core send/receive runs on Stellar's native payment operations, while Soroban powers the features that make a USSD wallet genuinely useful and trust-minimized instead of a fragile backend:

- 🔒 **PIN-gated, on-chain spending limits** per account
- ⏰ **Scheduled & recurring transfers** (rent, subscriptions, salaries)
- 👥 **Group savings** (ajo / esusu / thrift) logic enforced by contract
- 🤝 **Escrow-protected agent cash-out** for converting to physical naira

As naira-pegged stablecoins like cNGN mature on Stellar, the same Soroban layer lets Kobo settle natively in local currency.

---

## ✨ Features

| Feature                 | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| 🔐 Phone-number wallets | Create or recover a custodial Stellar account with a phone number + PIN |
| 💸 Send & receive       | Pay any phone number or Stellar address; funds settle in seconds        |
| 💰 Balance & history    | Check balances and recent transactions over USSD                        |
| 📡 100% offline-capable | Works on 2G feature phones, no data plan required                       |
| 🪙 Stellar assets       | XLM and USDC today; naira-pegged stablecoin (cNGN) on the roadmap       |
| 🔔 SMS receipts         | Confirmation sent for every transaction                                 |

---

## 🛠 Tech Stack

| Layer           | Tech                                                        |
| --------------- | ----------------------------------------------------------- |
| Blockchain      | Stellar (`@stellar/stellar-sdk`), Horizon/RPC, SEP-6/SEP-24 |
| Smart contracts | Soroban (Rust)                                              |
| USSD gateway    | Africa's Talking (sandbox supported)                        |
| Backend         | NestJS + TypeScript                                         |
| State & storage | PostgreSQL (wallets) + Redis (USSD session state)           |
| Frontend        | Next.js 16 + React 19 + Tailwind CSS v4                     |
| Security        | Encrypted server-side keystore, PIN-gated signing           |

> **Design note:** feature phones can't safely hold keys, so Kobo uses a PIN-gated encrypted custodial model. Self-custody export is on the roadmap.

---

## 🗂 Monorepo Structure

```
kobo/
├── backend/      # NestJS API — USSD webhook, wallet service, Stellar integration
└── frontend/     # Next.js admin/dashboard (optional web interface)
```

Each package has its own README with setup instructions.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL 14+ and Redis
- A free [Africa's Talking sandbox](https://account.africastalking.com) account
- Stellar Testnet access (no setup needed)

### Installation

```bash
git clone https://github.com/<your-org>/kobo.git
cd kobo

# Install all dependencies
cd backend && pnpm install
cd ../frontend && pnpm install

# Configure environment
cp backend/.env.example backend/.env   # add AT credentials, DB url, network=testnet

# Run migrations and start
cd backend
pnpm run db:migrate
pnpm run start:dev
```

Point your Africa's Talking sandbox channel at `POST /ussd`, then dial your test code in the AT simulator. New accounts are auto-funded on testnet via Friendbot.

---

## 🧩 Architecture

```
Feature phone  →  USSD gateway (Africa's Talking)
                        │  webhook POST /ussd
                        ▼
              Session engine (state machine, Redis)
                        │
                        ▼
              Wallet service  →  encrypted keystore (Postgres)
                        │
                        ▼
              Stellar service (@stellar/stellar-sdk)  →  Stellar network
                        │
                        ▼
                SMS notifications
```

Each USSD reply is one step in a session state machine. The wallet service signs with the PIN-unlocked key and submits to Stellar.

```
backend/src/
├── ussd/        # menu flows + session state machine
├── wallet/      # account creation, keystore, PIN auth
├── stellar/     # sdk wrappers: balances, payments, funding
├── sms/         # notification adapters
└── main.ts      # NestJS entrypoint
```

---

## 🤝 Contributing

PRs welcome — this repo is built for collaboration.

- **Branches:** `feat/short-description`, `fix/short-description`
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org)
- **Style:** Prettier + ESLint (`pnpm run lint`); tests must pass (`pnpm test`)
- Good first issues are labelled — start there.

See [CONTRIBUTING.md](./CONTRIBUTING.md). Join the conversation on Telegram / Discord.

---

## 📜 License

MIT — see [LICENSE](./LICENSE).
