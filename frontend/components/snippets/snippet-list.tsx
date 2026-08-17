import { getSnippets } from "@/lib/data";
import { SnippetFilterParams } from "@/types";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { Code2 } from "lucide-react";

interface SnippetListProps {
  filters: SnippetFilterParams;
}

/**
 * Async Server Component: SnippetList
 * 
 * Fetches data on the server without `useEffect` or client loading spinners!
 */
export async function SnippetList({ filters }: SnippetListProps) {
  const snippets = await getSnippets(filters);

  if (snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
          <Code2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">No snippets found</h3>
        <p className="mt-1 text-xs text-zinc-500 max-w-sm">
          Try adjusting your search query or language filter to discover other developer snippets.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
