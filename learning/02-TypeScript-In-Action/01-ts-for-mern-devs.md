---
tags:
  - typescript/foundations
  - mern-bridge
  - practical-ts
created: 2026-08-16
---

# 🔷 TypeScript Essentials for MERN Developers

As a JavaScript/MERN developer, you already know data structures (objects, arrays, functions, promises). TypeScript simply adds a **compile-time contract** to guarantee that data moving through your app matches what you expect.

---

## 1. 🧬 Primitive Types & Type Inference

TypeScript is smart: if you assign a value, it automatically infers the type.

```ts
// Inferred types (hover in VS Code):
let username = "alex_dev";     // string
let postCount = 42;            // number
let isPublished = true;        // boolean
let tags = ["react", "next"];  // string[]

// Explicit type annotations (use when initializing empty or complex data):
let activeUserId: string | null = null; // Union type: can be string OR null
```

---

## 2. 📑 `interface` vs `type` (The Practical Rule)

Both define the shape of an object. Here is the clean distinction:

### Use `interface` for Data Entities & Component Props:
```ts
// Perfect for database models or React props:
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string; // Optional property (can be undefined)
  createdAt: Date;
}

// Interfaces can extend each other:
export interface AdminUser extends User {
  role: "admin" | "superadmin"; // String literal union
  permissions: string[];
}
```

### Use `type` for Unions, Primitives, and Utility Combinations:
```ts
// Status state machine (Discriminated Union):
export type RequestState = 
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };

// Next.js HTTP Methods:
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
```

---

## 3. 🧪 Generics: "Functions for Types"

> [!MERN_COMPARISON]
> In Express, you wrote reusable helper functions that take arguments:
> `function wrap(data) { return { data, timestamp: Date.now() }; }`
>
> **Generics** are the exact same concept, but for **Types**. You pass a type parameter `<T>` so the wrapper knows what data it holds.

```ts
// Generic API Response Wrapper:
export interface ApiResponse<TData> {
  success: boolean;
  message?: string;
  data: TData;
}

// Usage with User type:
type UserResponse = ApiResponse<User>;
// Resulting type: { success: boolean; message?: string; data: User }

// Usage with Array of Posts:
type PostListResponse = ApiResponse<Post[]>;
```

---

## 4. 🛡️ Zod: Runtime Validation + Inferred TypeScript Types

TypeScript types disappear at runtime (in the browser or server). But what happens when external users submit form data or API requests?

We use **Zod** for runtime schema validation, and Zod automatically gives us the TypeScript type for free!

```ts
import { z } from "zod";

// 1. Define runtime validation schema:
export const CreatePostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  content: z.string().min(20, "Content must be at least 20 characters"),
  tags: z.array(z.string()).min(1, "Pick at least one tag"),
});

// 2. Automatically derive the TypeScript type from the schema:
export type CreatePostInput = z.infer<typeof CreatePostSchema>;

// Now you have both:
// 1) Runtime validation: CreatePostSchema.safeParse(formData)
// 2) Compile-time type: function createPost(input: CreatePostInput)
```

---

## 🔗 Related Notes
- `[[02-TypeScript-In-Action/02-typing-react-and-nextjs|Next: Typing React & Next.js Components]]`
- `[[01-Foundations/02-rsc-vs-client-components|Server vs Client Components]]`
- `[[05-Mutations-Server-Actions/01-server-actions-vs-express|Server Actions vs Express Controllers]]`
