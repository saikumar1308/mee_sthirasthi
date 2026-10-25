# Mee Sthiraasthi — Frontend

> React + TypeScript + Vite + Tailwind CSS v4

👉 **See the full setup guide in the [root README](../README.md)**

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Key Config

Set the backend URL in [`src/config.ts`](./src/config.ts):

```ts
export const BACKEND_URL = "http://localhost:8787"; // or your deployed worker URL
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Dev server + bundler |
| Tailwind CSS v4 | Utility-first styling |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Cloudinary | Image upload (direct from browser) |
| Vercel Analytics | Usage tracking |

## Project Structure

```
src/
├── components/       # Shared UI components
├── hooks/            # Custom React hooks
├── pages/            # Route-level page components
├── config.ts         # BACKEND_URL
├── index.css         # Global design system
└── App.tsx           # Root with BrowserRouter + routes
```
