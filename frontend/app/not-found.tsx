import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, FileQuestion } from "lucide-react";

/**
 * App Router Special File: not-found.tsx
 * 
 * Triggered automatically for unmapped URLs or when `notFound()` is invoked inside a page or Server Action.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 mb-4">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        404 - Page Not Found
      </h2>
      <p className="mt-2 text-xs text-zinc-500 max-w-xs">
        The snippet or page you are looking for does not exist or has been removed.
      </p>

      <div className="mt-6">
        <Link href="/">
          <Button variant="primary" size="md">
            <Compass className="h-4 w-4" />
            <span>Return to Explore Feed</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
