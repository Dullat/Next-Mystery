import { Snippet, User, SnippetFilterParams, Language } from "@/types";

export const MOCK_USERS: Record<string, User> = {
  u1: {
    id: "u1",
    name: "Sarah Lin",
    username: "sarahlin",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Senior Fullstack Engineer & TS Enthusiast. Building next-gen web tools.",
    role: "pro",
    createdAt: "2024-01-15",
  },
  u2: {
    id: "u2",
    name: "Alex Rivera",
    username: "arivera",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    bio: "Systems Engineer & Rustacean. Loving Next.js Server Components.",
    role: "developer",
    createdAt: "2024-03-22",
  },
  u3: {
    id: "u3",
    name: "Elena Rostova",
    username: "elena_dev",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    bio: "Database Architect & SQL optimizer. Always indexing.",
    role: "admin",
    createdAt: "2023-11-05",
  },
};

export const MOCK_SNIPPETS: Snippet[] = [
  {
    id: "snip-1",
    title: "Next.js 15 Async Params Helper with Type Safety",
    description: "A clean pattern to safely unwrap async params in App Router dynamic routes with zero any types.",
    language: "typescript",
    tags: ["nextjs", "typescript", "app-router"],
    authorId: "u1",
    author: MOCK_USERS["u1"],
    likesCount: 128,
    viewsCount: 1420,
    isLiked: false,
    createdAt: "2026-08-10T14:32:00Z",
    updatedAt: "2026-08-10T14:32:00Z",
    code: `interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SnippetDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  
  const snippet = await getSnippetById(id);
  if (!snippet) notFound();

  return <SnippetView snippet={snippet} tab={query.tab as string} />;
}`,
  },
  {
    id: "snip-2",
    title: "Optimistic UI Toggle Hook with React 19",
    description: "Instant feedback when liking or favoriting items before server confirmation.",
    language: "typescript",
    tags: ["react19", "optimistic-ui", "hooks"],
    authorId: "u2",
    author: MOCK_USERS["u2"],
    likesCount: 94,
    viewsCount: 880,
    isLiked: true,
    createdAt: "2026-08-12T09:15:00Z",
    updatedAt: "2026-08-12T09:15:00Z",
    code: `"use client";

import { useOptimistic, startTransition } from "react";
import { toggleLikeAction } from "@/actions/snippets";

export function LikeButton({ id, initialCount, initialLiked }: Props) {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { count: initialCount, isLiked: initialLiked },
    (state) => ({
      count: state.isLiked ? state.count - 1 : state.count + 1,
      isLiked: !state.isLiked,
    })
  );

  const handleClick = async () => {
    startTransition(async () => {
      setOptimisticState(null);
      await toggleLikeAction(id);
    });
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-1.5">
      ❤️ <span>{optimisticState.count}</span>
    </button>
  );
}`,
  },
  {
    id: "snip-3",
    title: "PostgreSQL Recursive CTE for Nested Comment Trees",
    description: "High-performance recursive SQL query to retrieve threaded discussions in a single query.",
    language: "sql",
    tags: ["sql", "postgres", "database"],
    authorId: "u3",
    author: MOCK_USERS["u3"],
    likesCount: 215,
    viewsCount: 3100,
    isLiked: false,
    createdAt: "2026-08-01T18:00:00Z",
    updatedAt: "2026-08-01T18:00:00Z",
    code: `WITH RECURSIVE CommentTree AS (
  -- Anchor member: top-level comments
  SELECT id, snippet_id, parent_id, author_id, content, created_at, 1 AS depth
  FROM comments
  WHERE parent_id IS NULL AND snippet_id = $1

  UNION ALL

  -- Recursive member: child comments
  SELECT c.id, c.snippet_id, c.parent_id, c.author_id, c.content, c.created_at, ct.depth + 1
  FROM comments c
  INNER JOIN CommentTree ct ON c.parent_id = ct.id
)
SELECT * FROM CommentTree ORDER BY created_at ASC;`,
  },
  {
    id: "snip-4",
    title: "Zero-Overhead Memory Cache for Server Actions",
    description: "In-memory LRU caching pattern with TTL for hot data in Node / Edge runtimes.",
    language: "typescript",
    tags: ["typescript", "performance", "backend"],
    authorId: "u1",
    author: MOCK_USERS["u1"],
    likesCount: 76,
    viewsCount: 650,
    isLiked: false,
    createdAt: "2026-08-14T11:20:00Z",
    updatedAt: "2026-08-14T11:20:00Z",
    code: `export class SimpleCache<T> {
  private cache = new Map<string, { value: T; expires: number }>();

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  set(key: string, value: T, ttlMs = 60000): void {
    this.cache.set(key, { value, expires: Date.now() + ttlMs });
  }
}`,
  },
];

/**
 * Simulates a direct database query with optional filtering and latency
 */
export async function getSnippets(filters: SnippetFilterParams = {}): Promise<Snippet[]> {
  // Simulate 150ms server query time
  await new Promise((resolve) => setTimeout(resolve, 150));

  let results = [...MOCK_SNIPPETS];

  if (filters.lang && filters.lang !== "all") {
    results = results.filter((s) => s.language === filters.lang);
  }

  if (filters.q) {
    const query = filters.q.toLowerCase();
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (filters.tag) {
    results = results.filter((s) => s.tags.includes(filters.tag!));
  }

  if (filters.sort === "popular") {
    results.sort((a, b) => b.likesCount - a.likesCount);
  } else if (filters.sort === "trending") {
    results.sort((a, b) => b.viewsCount - a.viewsCount);
  } else {
    // latest
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return results;
}

export async function getSnippetById(id: string): Promise<Snippet | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const snippet = MOCK_SNIPPETS.find((s) => s.id === id);
  return snippet ?? null;
}
