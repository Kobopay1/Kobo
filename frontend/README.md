# Kobo — Frontend

Next.js web interface for Kobo — an optional admin dashboard and user-facing portal that complements the core USSD wallet experience.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI library:** React 19
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Package manager:** pnpm

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Install

```bash
pnpm install
```

### Run

```bash
# Development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `pnpm run dev`   | Start development server with hot reload |
| `pnpm run build` | Build for production                     |
| `pnpm run start` | Start production server                  |

---

## Project Structure

```
src/
└── app/
    ├── layout.tsx    # Root layout and global metadata
    ├── page.tsx      # Home page
    └── globals.css   # Global styles (Tailwind base)
```

---

## Notes

The core Kobo product runs entirely over USSD — no smartphone or internet required. This frontend is an optional layer for:

- Admin visibility into wallet activity
- A web onboarding or support portal
- Future self-custody key export flows

For the USSD backend, see [`../backend`](../backend/README.md).
