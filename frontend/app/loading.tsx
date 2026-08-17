import { Skeleton } from "@/components/ui/skeleton";

/**
 * App Router Special File: loading.tsx
 * 
 * Next.js automatically wraps `page.tsx` inside React `<Suspense fallback={<Loading />}>`.
 * When a user navigates, this skeleton is rendered instantly while server data streams in.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <Skeleton className="h-10 w-full max-w-md rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-12 rounded-full" />
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
    </div>
  );
}
