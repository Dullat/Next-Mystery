/**
 * DevPulse Core TypeScript Domain Models & Interfaces
 * 
 * Notice:
 * 1. We use string literal unions (e.g. `Language`, `SortOption`) for strict value bounds.
 * 2. We use `interface` for entity data objects (User, Snippet).
 * 3. We use Generics for reusable wrappers (`ActionResponse<T>`).
 */

export type Language =
  | "typescript"
  | "javascript"
  | "python"
  | "rust"
  | "go"
  | "sql"
  | "css"
  | "html"
  | "json";

export type SortOption = "latest" | "popular" | "trending";

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  role: "developer" | "pro" | "admin";
  createdAt: string;
}

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: Language;
  tags: string[];
  authorId: string;
  author: User;
  likesCount: number;
  viewsCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Type-safe URL Search Parameters for Snippet Filtering & Discovery
 */
export interface SnippetFilterParams {
  q?: string;
  lang?: Language | "all";
  tag?: string;
  sort?: SortOption;
}

/**
 * Generic Action Response State for React 19 Server Actions & useActionState
 */
export interface ActionResponse<T = unknown> {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
}
