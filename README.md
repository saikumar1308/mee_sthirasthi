# మీ స్థిరాస్థి — Mee Sthiraasthi

> **A modern real estate platform for buying, selling, and renting properties across Telangana & Andhra Pradesh.**

[![GitHub](https://img.shields.io/badge/GitHub-mee_sthirasthi-1E3A5F?logo=github)](https://github.com/saikumar1308/mee_sthirasthi)
[![Built with React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?logo=react)](https://react.dev)
[![Backend](https://img.shields.io/badge/Backend-Hono%20on%20Cloudflare%20Workers-F38020?logo=cloudflare)](https://hono.dev)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-336791?logo=postgresql)](https://www.prisma.io)

---

## 📸 Overview

Mee Sthiraasthi lets users:
- **Browse** properties available for rent, sale, or lease
- **List** their own property with a 3-step wizard form, photo upload, and rich details
- **Contact** the property owner directly (login required)
- **Sign up / Sign in** securely via JWT-based authentication

---

## 🏗️ Architecture

```
mee_sthirasthi/
├── frontend/          # React + TypeScript + Vite + Tailwind CSS v4
└── backend/           # Hono (Cloudflare Workers) + Prisma + PostgreSQL
```

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Hono (runs on Cloudflare Workers via Wrangler) |
| Database | PostgreSQL (via Prisma + Prisma Accelerate) |
| Image Storage | Cloudinary |
| Auth | JWT (stored in `localStorage`) |
| Deployment | Vercel (frontend) + Cloudflare Workers (backend) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [Cloudflare account](https://dash.cloudflare.com/) (free tier works)
- A [Neon](https://neon.tech/) / [Supabase](https://supabase.com/) or any PostgreSQL database
- A [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) API key (wraps your DB URL)
- A [Cloudinary](https://cloudinary.com/) account (free tier works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/saikumar1308/mee_sthirasthi.git
cd mee_sthirasthi
```

---

### 2. Backend Setup

The backend runs as a **Cloudflare Worker** using the Wrangler CLI.

```bash
cd backend
npm install
```

#### Configure Secrets

Cloudflare Workers use **environment variables / secrets**, not `.env` files.
Set them via Wrangler:

```bash
# Your Prisma Accelerate connection string (starts with prisma://...)
npx wrangler secret put DATABASE_URL

# Any strong random string for JWT signing
npx wrangler secret put JWT_SECRET
```

> **For local development**, create a `wrangler.toml` (or `.dev.vars`) file in the `backend/` directory:
>
> ```toml
> # wrangler.toml
> name = "mee-sthirasthi-backend"
> main = "src/index.ts"
> compatibility_date = "2024-01-01"
> ```
>
> And a `.dev.vars` file (never commit this!):
> ```
> DATABASE_URL=prisma://accelerate.prisma-data.net/?api_key=YOUR_KEY
> JWT_SECRET=your_super_secret_jwt_key
> ```

#### Run the Prisma Migration

> ⚠️ Prisma Accelerate is used at runtime, but migrations are run against the **direct** PostgreSQL URL.

```bash
# Use the direct postgres:// URL for migrations (not the prisma:// accelerate URL)
DATABASE_URL="postgresql://user:password@host:5432/dbname" npx prisma migrate dev --name init
```

#### Start Backend Locally

```bash
npm run dev
# Runs on http://localhost:8787 by default (Wrangler dev server)
```

#### Deploy Backend

```bash
npm run deploy
# Deploys to Cloudflare Workers
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Configure the Backend URL

Open [`src/config.ts`](./frontend/src/config.ts) and set the backend URL:

```ts
// frontend/src/config.ts
export const BACKEND_URL = "http://localhost:8787";   // local development
// export const BACKEND_URL = "https://your-worker.your-subdomain.workers.dev"; // production
```

#### Start Frontend Locally

```bash
npm run dev
# Runs on http://localhost:5173 (or the next available port)
```

Open your browser at `http://localhost:5173`.

#### Build for Production

```bash
npm run build
# Output in frontend/dist/
```

---

## 🔑 Environment Variables Reference

### Backend (Cloudflare Worker Secrets / `.dev.vars`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Prisma Accelerate connection string (`prisma://...`) |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |

### Frontend

No `.env` file is needed — the only configuration is the `BACKEND_URL` constant in [`src/config.ts`](./frontend/src/config.ts).

---

## 📁 Project Structure

```
frontend/
├── public/                  # Static assets (logo, background image, fonts, SVG icons)
│   └── fonts/               # Gurajada & Playfair Display local fonts
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppBar.tsx        # Top navigation bar (auth-aware)
│   │   ├── Footer.tsx        # Site footer
│   │   ├── Toast.tsx         # Custom toast notification system
│   │   ├── PropertyCard.tsx  # Property list card
│   │   ├── FullPropertyCard.tsx  # Full property detail view
│   │   ├── TopPicks.tsx      # Home page featured property card
│   │   ├── TopComp.tsx       # Home page search widget
│   │   ├── signinComp.tsx    # Sign-in form
│   │   └── signupComp.tsx    # Sign-up form
│   ├── hooks/
│   │   └── index.ts          # Custom React hooks (useProperties, useProperty, useAllProperties)
│   ├── pages/
│   │   ├── home.tsx          # Landing page
│   │   ├── allProperties.tsx # Browse all properties (by type)
│   │   ├── Property.tsx      # Single property detail page
│   │   ├── sellingPage.tsx   # 3-step wizard to list a property
│   │   ├── signin.tsx        # Sign-in page wrapper
│   │   └── signup.tsx        # Sign-up page wrapper
│   ├── App.tsx               # Root component with routing
│   ├── config.ts             # BACKEND_URL constant
│   ├── index.css             # Global design system (tokens, component classes)
│   └── App.css               # App-level overrides
└── vite.config.ts

backend/
├── prisma/
│   └── schema.prisma         # Database schema (User, Property models)
└── src/
    ├── index.ts              # Hono app entry point (CORS, route mounting)
    └── routes/
        ├── user.ts           # POST /user/signup, POST /user/signin
        └── property.ts       # Property CRUD + owner lookup
```

---

## 🔌 API Reference

Base URL: your Cloudflare Worker URL

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/user/signup` | ❌ | Register a new user |
| `POST` | `/user/signin` | ❌ | Sign in, returns JWT token |

**Signup body:**
```json
{
  "username": "string",
  "password": "string",
  "number": 9876543210,
  "email": "user@example.com"
}
```

**Signin body:**
```json
{ "username": "string", "password": "string" }
```

### Properties

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/property` | ❌ | Get top 5 properties (home page picks) |
| `GET` | `/property/:selection` | ❌ | Get all properties by type (`rent`/`buy`/`lease`) |
| `GET` | `/property/:selection/:id` | ❌ | Get a single property with owner info |
| `POST` | `/property/sell` | ✅ JWT | Create a new property listing |
| `POST` | `/property/sell/owner` | ✅ JWT | Get owner contact details for a property |

All authenticated routes require the header:
```
Authorization: <jwt_token>
```

---

## ☁️ Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com/)
2. Go to **Settings → Upload → Upload Presets**
3. Create an **unsigned** upload preset named `mee_sthiraasthi`
4. Note your **Cloud Name** (e.g. `ddijvm8a4`)

The frontend uploads directly to Cloudinary — no backend involvement needed for images.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👨‍💻 Developer

Built with ❤️ by **Sai Kumar Pentala**

- 📧 [saikumarpentala@gmail.com](mailto:saikumarpentala@gmail.com)
- 🐙 [GitHub](https://github.com/saikumar1308)
- 💬 [Discord](http://discord.com/users/1015938234078998569)
- 📸 [Instagram](http://www.instagram.com/saikumar_7989/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
