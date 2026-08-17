# AI Teaching & Project Guide: Next.js + TypeScript Mastery

> **Agent Context Protocol**: Any AI model (Antigravity, Claude Code, Cursor, Copilot, ChatGPT) interacting with this repository MUST read and adhere to this document.

---

## 👤 Student Profile & Background
- **Background**: Experienced MERN Stack Developer (React SPA, Node.js, Express.js, MongoDB, SQL).
- **Core Strengths**: Client-side React lifecycle (`useState`, `useEffect`, Context API), RESTful API design in Express, Middleware concepts, Async JavaScript, Database querying & schema design.
- **Current Goal**: Master **Next.js (App Router / Next 15+)** and **TypeScript** from pure fundamentals to production-grade architecture.
- **Learning Strategy**:
  1. **TypeScript in Context**: Teach TypeScript *alongside* Next.js — no isolated dry theory. Every TS concept (interfaces, generics, Zod schemas, discriminated unions, utility types) must be introduced in direct relation to the Next.js feature being built.
  2. **The MERN Bridge**: Always map Next.js paradigms back to Express + React SPA mental models (e.g., Express Controller $\rightarrow$ Server Action / Route Handler; `useEffect` fetch $\rightarrow$ async Server Component + Suspense; Redux/Context $\rightarrow$ URL State + Server State).
  3. **Obsidian Knowledge System**: Every concept, pattern, and architectural decision must be documented in `learning/` as Obsidian-compatible markdown (`[[wikilinks]]`, tags, mermaid diagrams, callouts).
  4. **Active Project-Based Learning**: Teach by guiding the student through building a comprehensive fullstack application. Explain the *why* before writing code, break down TypeScript types line-by-line, and prompt the student with mini-challenges to cement concepts.

---

## 📂 Repository Architecture

```
NextMystery/
├── AGENTS.md                     # Master AI Orchestrator & Progress Log (This file)
├── CLAUDE.md                     # Claude Code pointer to AGENTS.md
├── learning/                     # 🧠 Obsidian Knowledge Vault (Deep Dives, Mindmaps, Cheatsheets)
│   ├── 00-Index.md               # Master graph index & interactive roadmap
│   ├── 01-Foundations/           # MERN vs Next.js, RSC vs Client, Hydration
│   ├── 02-TypeScript-In-Action/  # TS types, generics, Zod, Next.js type helpers
│   ├── 03-Routing-Layouts/       # Dynamic routes, route groups, parallel/intercepting
│   ├── 04-Data-Fetching-Caching/ # Server fetch, caching layers, Suspense, streaming
│   ├── 05-Mutations-Server-Actions/ # Server Actions, useActionState, useOptimistic, revalidation
│   ├── 06-Route-Handlers-APIs/   # Route handlers, middleware, edge runtime
│   ├── 07-Auth-Security/         # Auth.js / Sessions / Middleware protection
│   ├── 08-Database-ORM/          # Prisma / Drizzle / PostgreSQL / MongoDB
│   └── 09-Projects-Blueprints/   # System design & step-by-step project guides
└── projects/                     # 🚀 Hands-on Next.js + TypeScript Applications
    └── devpulse/                 # (Or active learning project)
```

---

## 📝 Obsidian Markdown Standards for `learning/`
When creating or updating notes in `learning/`, you **must** follow these conventions:

1. **Obsidian Wikilinks**: Link related notes using `[[folder/note-name|Display Text]]`.
2. **Tags**: Include relevant hierarchical tags at the top of each note (e.g. `#nextjs/rsc`, `#ts/generics`, `#roadmap/phase-1`).
3. **MERN Bridge Callouts**: Use Obsidian callouts for comparisons:
   ```markdown
   > [!MERN_COMPARISON]
   > In Express, you wrote `router.post('/api/posts', authMiddleware, controller)`.
   > In Next.js App Router, you use a **Server Action** with a `'use server'` directive.
   ```
4. **Mermaid Diagrams**: Include flowcharts, mindmaps, and sequence diagrams for visual comprehension.
5. **Strict TypeScript Annotations**: Every code snippet must have clean, explicit TypeScript types without `any`.

---

## 🎯 Active Project: "DevPulse" (Fullstack Developer Platform)
*A fullstack developer collaboration & snippet platform featuring dynamic routes, server actions, optimistic UI, authentication, database ORM, and streaming.*

### 🗺️ Master Learning Roadmap & Status

| Phase | Topic / Module | Key Next.js + TS Concepts | Status | Note Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | **Foundations & Folder Architecture** | RSC vs Client (`'use client'`), MERN bridge, Clean Folder Structure | 🟢 Completed | `[[01-Foundations/01-mern-vs-nextjs-mental-model]]`, `[[03-Routing-Layouts/02-production-folder-structure]]` |
| **Phase 2** | **TypeScript in Action & Domain Modeling** | Interfaces, Generics, Zod Schema Validation, Next 15+ Async Params | 🟢 Completed | `[[02-TypeScript-In-Action/01-ts-for-mern-devs]]`, `[[02-TypeScript-In-Action/02-typing-react-and-nextjs]]` |
| **Phase 3** | **App Router Architecture & Special Files** | `layout`, `page`, `loading`, `error`, `not-found`, Dynamic routes `[id]` | 🟢 Completed | `[[03-Routing-Layouts/01-app-router-anatomy]]` |
| **Phase 4** | **Data Fetching, Suspense & Streaming** | Async Server Components, `<Suspense>`, URL State via `searchParams` | 🟢 Completed | `[[04-Data-Fetching-Caching/01-server-fetching-and-suspense]]` |
| **Phase 5** | **Server Actions & Mutations** | `'use server'`, Zod parsing, `useActionState`, `revalidatePath` | 🟢 Completed | `[[05-Mutations-Server-Actions/01-server-actions-vs-express]]` |
| **Phase 6** | **Advanced Routing & Parallel/Intercepting Routes** | Modal route interception (`@modal/(..)snippets/[id]`) | 🟡 Next Up | `[[03-Routing-Layouts/03-parallel-and-intercepting-routes]]` |
| **Phase 7** | **Optimistic UI & Interactive State** | React 19 `useOptimistic`, server synchronization | ⚪ Upcoming | `[[05-Mutations-Server-Actions/02-optimistic-ui-updates]]` |
| **Phase 8** | **Auth, Middleware & Persistent DB** | NextAuth / Auth.js, Route guards, Prisma / PostgreSQL | ⚪ Upcoming | `[[07-Auth-Security/01-auth-and-middleware]]` |

---

## 🛡️ Next.js 15+ / 16 Rules & Breaking Changes to Watch
- **Async Dynamic APIs**: `params` and `searchParams` in Page props and Route Handlers are **Promises** in Next.js 15+. Always `await props.params` or type as `params: Promise<{ id: string }>`.
- **Default Caching**: `fetch()` requests are no longer cached by default in Next.js 15+ (they default to `no-store` unless explicitly specified or using `cache: 'force-cache'`).
- **React 19 Hooks**: Use `useActionState` instead of deprecated `useFormState`.
- **Clean Type Safety**: Zero `any` policy. Always leverage TypeScript inference and precise interface definitions.
