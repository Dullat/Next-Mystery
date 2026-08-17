import Link from "next/link";
import { Snippet } from "@/types";
import { Badge } from "@/components/ui/badge";
import { LikeButton } from "@/components/snippets/like-button";
import { Eye, Clock } from "lucide-react";

interface SnippetCardProps {
  snippet: Snippet;
}

const LANGUAGE_COLORS: Record<string, "accent" | "success" | "default" | "secondary"> = {
  typescript: "accent",
  javascript: "default",
  python: "success",
  rust: "secondary",
  sql: "accent",
  css: "secondary",
};

/**
 * Server Component: SnippetCard
 * 
 * Notice:
 * 1. Zero `"use client"` directive: this entire card is prerendered into lightweight HTML on the server.
 * 2. It embeds the `<LikeButton />` Client Component seamlessly.
 * 3. It links dynamically to `/snippets/${snippet.id}`.
 */
export function SnippetCard({ snippet }: SnippetCardProps) {
  const badgeVariant = LANGUAGE_COLORS[snippet.language] ?? "default";

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700">
      <div>
        {/* Top bar: Language Badge & Like Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={badgeVariant} size="sm" className="capitalize font-mono">
            {snippet.language}
          </Badge>
          <LikeButton
            snippetId={snippet.id}
            initialLikes={snippet.likesCount}
            initialLiked={snippet.isLiked}
          />
        </div>

        {/* Title & Description */}
        <Link href={`/snippets/${snippet.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {snippet.title}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {snippet.description}
          </p>
        </Link>

        {/* Code Preview Box */}
        <div className="mt-3.5 overflow-hidden rounded-lg border border-zinc-200/80 bg-zinc-950 p-3 text-[11px] font-mono text-zinc-200 dark:border-zinc-800">
          <pre className="overflow-x-auto whitespace-pre leading-snug">
            <code>{snippet.code.slice(0, 160)}...</code>
          </pre>
        </div>
      </div>

      {/* Footer Info: Author & Meta */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <img
            src={snippet.author.avatarUrl}
            alt={snippet.author.name}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{snippet.author.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {snippet.viewsCount}
          </span>
        </div>
      </div>
    </article>
  );
}
