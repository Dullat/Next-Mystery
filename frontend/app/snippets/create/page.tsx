import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SnippetForm } from "@/components/snippets/snippet-form";

export const metadata = {
  title: "Create Snippet - DevPulse",
  description: "Share a reusable code snippet or database query with the developer community.",
};

/**
 * Server Component: CreateSnippetPage
 * 
 * Notice:
 * 1. The page is an async Server Component for fast static initial render and SEO metadata.
 * 2. It wraps the `<SnippetForm />` Client Component.
 */
export default function CreateSnippetPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to explore feed</span>
      </Link>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Publish New Code Snippet
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Share type-safe patterns, ORM queries, or Next.js configurations.
          </p>
        </div>

        <SnippetForm />
      </div>
    </div>
  );
}
