---
tags:
  - nextjs/architecture
  - folder-structure
  - best-practices
  - mern-bridge
created: 2026-08-17
---

# 🏛️ Production Folder Structure: MERN vs Next.js

When you build a MERN app, you usually have two repositories or a root folder split into `client/` and `server/`.

In modern Next.js with TypeScript, everything is unified under a clean, scalable architecture.

---

## 1. 🔍 Comparison: MERN Layout vs Next.js Layout

```
MERN Architecture (Separated)          Next.js App Router (Unified)
─────────────────────────────          ────────────────────────────
my-mern-app/                           devpulse/
├── client/                            ├── app/                   # 🚦 Routing & Pages (RSC)
│   ├── src/                           │   ├── layout.tsx         # Root Shell (HTML, Fonts, Nav)
│   │   ├── components/                │   ├── page.tsx           # Home Feed (Async Server Comp)
│   │   ├── pages/                     │   ├── (auth)/            # Route Group: Login, Register
│   │   ├── context/                   │   ├── snippets/          # Feature Routes (/snippets/[id])
│   │   ├── api/ (axios calls)         │   ├── api/               # Webhooks & Route Handlers
│   │   └── App.jsx (React Router)     │   ├── loading.tsx        # Global Suspense skeleton
│   └── package.json                   │   └── error.tsx          # Error Boundary ('use client')
│                                      ├── components/            # 🧩 UI Component Tree
└── server/                            │   ├── ui/                # Base primitives (Button, Modal, Input)
    ├── controllers/                   │   ├── snippets/          # Feature UI (SnippetCard, SnippetForm)
    ├── routes/                        │   └── layout/            # Layout UI (Navbar, Footer, Sidebar)
    ├── models/ (Mongoose / SQL)       ├── actions/               # 🔄 Server Actions ('use server')
    ├── middleware/                    │   └── snippets.ts        # Type-safe mutations + Zod validation
    └── server.js                      ├── lib/                   # 🛠️ Database, ORM & Utilities
                                       │   ├── db.ts              # Prisma / DB connection pool
                                       │   └── utils.ts           # Class merging (cn) & date formatters
                                       ├── types/                 # 🔷 Shared TypeScript Domain Models
                                       │   └── index.ts           # Snippet, User, ActionState interfaces
                                       └── proxy.ts / middleware.ts # 🛡️ Edge Route Guards & Auth
```

---

## 2. 🧱 Breakdown of Each Directory's Responsibility

### `app/` (The Routing Engine)
- **Only contains routing-related code**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Keep pages lightweight! A page should fetch data on the server and compose components from `components/`.

### `components/` (The Presentation Layer)
- `components/ui/`: Reusable, generic UI primitives that don't know about business logic (Buttons, Badges, Inputs, Dialogs, Dropdowns).
- `components/snippets/`: Domain-specific components (e.g., `SnippetCard.tsx`, `CodeEditor.tsx`, `LikeButton.tsx`).
- `components/layout/`: Global navigation, headers, footers, mobile drawers.

### `actions/` (The Server Action Layer)
- Replaces Express Controllers!
- Every file in here has `'use server'` at the top.
- Takes validated `FormData` or JSON arguments, interacts with the database, and calls `revalidatePath()`.

### `lib/` (The Core Infrastructure)
- Database clients (Prisma, Drizzle, Mongoose instance).
- Authentication utilities (session helpers).
- Utility helper functions (`cn()` for Tailwind class merging).

### `types/` (The TypeScript Contract)
- Pure type definitions (`.ts` files).
- Zero runtime JavaScript output.
- Defines domain entities (`User`, `Snippet`, `Language`), API responses, and form state shapes.

---

## 3. 🎯 Route Groups `(group)` vs Folders

- A regular folder named `posts` creates a URL segment: `/posts`
- A folder enclosed in parentheses `(auth)` is a **Route Group**. Next.js **ignores** the folder name in the URL:
  - `app/(auth)/login/page.tsx` $\rightarrow$ `/login` (NOT `/auth/login`)
  - `app/(auth)/register/page.tsx` $\rightarrow$ `/register`
- **Why use Route Groups?** It allows you to give `(auth)` its own minimal layout (no navbar/sidebar), while `(app)` has the main dashboard layout!

---

## 🔗 Related Notes
- `[[00-Index|Master Index]]`
- `[[01-Foundations/01-mern-vs-nextjs-mental-model|MERN vs Next.js Mental Model]]`
- `[[01-Foundations/02-rsc-vs-client-components|Server vs Client Components]]`
- `[[09-Projects-Blueprints/01-project-catalog-and-blueprint|DevPulse Project Blueprint]]`
