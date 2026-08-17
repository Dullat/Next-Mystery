---
tags:
  - typescript/nextjs
  - typescript/react
  - nextjs15
  - breaking-changes
created: 2026-08-16
---

# 🧩 Typing React & Next.js Components

In Next.js, typing your components correctly eliminates 99% of runtime bugs. Here is your definitive reference guide.

---

## 1. 🎛️ Standard React Component Props & Children

```tsx
import React from "react";

// 1. Define Props Interface:
interface CardProps {
  title: string;
  badge?: string;                         // Optional string
  variant?: "default" | "highlight" | "danger"; // Union of specific string values
  children: React.ReactNode;               // Valid JSX, string, element, or array
  onClick?: () => void;                   // Optional callback function
}

// 2. Type Component with destructuring:
export function Card({
  title,
  badge,
  variant = "default",
  children,
  onClick,
}: CardProps) {
  return (
    <div className={`card card-${variant}`} onClick={onClick}>
      <header className="flex justify-between">
        <h3>{title}</h3>
        {badge && <span className="badge">{badge}</span>}
      </header>
      <div className="card-body">{children}</div>
    </div>
  );
}
```

---

## 2. ⚡ Next.js 15/16 Page & Layout Props (Async Breaking Change!)

> [!IMPORTANT]
> **Next.js 15+ Crucial Update:**
> In Next.js 15 and 16, `params` and `searchParams` passed to `page.tsx` are **Promises**. You must type them as `Promise<...>` and `await` them inside async Server Components.

### Example: `app/posts/[id]/page.tsx`
```tsx
// 1. Define the Page Props interface:
interface PostPageProps {
  params: Promise<{
    id: string; // Dynamic route segment: /posts/:id
  }>;
  searchParams: Promise<{
    tab?: string; // Query params: /posts/:id?tab=comments
    sort?: "asc" | "desc";
  }>;
}

// 2. Implement the async Page Component:
export default async function PostPage({ params, searchParams }: PostPageProps) {
  // Await the asynchronous route parameters:
  const { id } = await params;
  const { tab = "overview", sort = "desc" } = await searchParams;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Post ID: {id}</h1>
      <p>Current Tab: {tab} (Sorting: {sort})</p>
    </main>
  );
}
```

---

## 3. 🖱️ Event Handlers & Form Inputs

When working with interactive Client Components (`'use client'`), TypeScript needs to know what DOM element triggered the event:

```tsx
"use client";

import React, { useState } from "react";

export function SearchInput() {
  const [query, setQuery] = useState<string>("");

  // Typing the input change event:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Typing the form submission event:
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search posts..."
        className="px-3 py-1 border rounded"
      />
      <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
}
```

---

## 4. 🔄 Typing Server Actions (`useActionState`)

Next.js Server Actions return a state object when paired with React 19's `useActionState`:

```ts
// types/action-state.ts
export interface ActionState<T = unknown> {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
}
```

```tsx
// actions/post-actions.ts
"use server";

import { ActionState } from "@/types/action-state";

export async function createPostAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string;
  
  if (!title || title.length < 5) {
    return {
      success: false,
      message: "Title must be at least 5 characters",
    };
  }

  // Database mutation logic here...
  return {
    success: true,
    message: "Post created successfully!",
  };
}
```

---

## 🔗 Related Notes
- `[[02-TypeScript-In-Action/01-ts-for-mern-devs|TypeScript Essentials for MERN Devs]]`
- `[[03-Routing-Layouts/01-app-router-mental-model|App Router Mental Model]]`
- `[[05-Mutations-Server-Actions/01-server-actions-vs-express|Server Actions vs Express]]`
