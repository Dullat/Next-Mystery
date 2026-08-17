import { Suspense } from "react";
import { FilterBar } from "@/components/snippets/filter-bar";
import { SnippetList } from "@/components/snippets/snippet-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Terminal } from "lucide-react";
import { Language, SortOption } from "@/types";

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    lang?: string;
    tag?: string;
    sort?: string;
  }>;
}

function SnippetFeedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60 space-y-4"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Server Component: HomePage
 * 
 * Next.js 15+ Async Dynamic API:
 * `searchParams` is a Promise and must be awaited.
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const query = await searchParams;

  const filters = {
    q: query.q,
    lang: query.lang as Language | "all" | undefined,
    tag: query.tag,
    sort: query.sort as SortOption | undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col gap-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Terminal className="h-3.5 w-3.5" />
          <span>Fullstack Developer Feed</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Discover & Share Modern Code
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Explore curated snippets, server actions, SQL queries, and architecture patterns built with Next.js & TypeScript.
        </p>
      </div>

      {/* Interactive Filter & Search Bar */}
      <FilterBar />

      {/* Streamed Snippet Grid with Suspense */}
      <Suspense key={`${query.q}-${query.lang}-${query.tag}-${query.sort}`} fallback={<SnippetFeedSkeleton />}>
        <SnippetList filters={filters} />
      </Suspense>
    </div>
  );
}
