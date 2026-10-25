# Mee Sthiraasthi — Backend

> Hono on Cloudflare Workers + Prisma + PostgreSQL

👉 **See the full setup guide in the [root README](../README.md)**

---

## Quick Start

```bash
npm install
npm run dev       # Wrangler dev server → http://localhost:8787
npm run deploy    # Deploy to Cloudflare Workers
```

## Environment Variables

Set these as Cloudflare Worker secrets (or in `.dev.vars` for local dev):

```bash
npx wrangler secret put DATABASE_URL   # prisma://accelerate.prisma-data.net/?api_key=...
npx wrangler secret put JWT_SECRET     # any strong random string
```

`.dev.vars` (local only — never commit!):
```
DATABASE_URL=prisma://accelerate.prisma-data.net/?api_key=YOUR_KEY
JWT_SECRET=your_local_jwt_secret
```

## Database Migrations

Run migrations against the **direct** PostgreSQL URL (not the Accelerate URL):

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db" npx prisma migrate dev --name init
```

## Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/user/signup` | ❌ | Register user |
| `POST` | `/user/signin` | ❌ | Sign in, returns JWT |
| `GET` | `/property` | ❌ | Top 5 properties |
| `GET` | `/property/:selection` | ❌ | By type: rent/buy/lease |
| `GET` | `/property/:selection/:id` | ❌ | Single property |
| `POST` | `/property/sell` | ✅ | Create listing |
| `POST` | `/property/sell/owner` | ✅ | Get owner contact |

## Tech Stack

| Tool | Purpose |
|------|---------|
| Hono | Web framework (Cloudflare Workers compatible) |
| Wrangler | Cloudflare Workers CLI |
| Prisma | ORM |
| Prisma Accelerate | Connection pooling for serverless |
| PostgreSQL | Database |
| Hono JWT | Auth middleware |
