"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * App Router Special File: error.tsx
 * 
 * Must be a Client Component.
 * Catches runtime rendering and data-fetching errors in this route segment subtree.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime Segment Error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center text-center px-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 mb-4 border border-red-200 dark:border-red-900">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Something went wrong!
      </h2>
      <p className="mt-1.5 text-xs text-zinc-500 max-w-sm">
        {error.message || "An unexpected error occurred while rendering this page."}
      </p>

      <div className="mt-6">
        <Button onClick={() => reset()} variant="outline" size="md">
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
      </div>
    </div>
  );
}
