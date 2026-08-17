import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Clock, Calendar, Share2, Tag } from "lucide-react";
import { getSnippetById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { LikeButton } from "@/components/snippets/like-button";

interface SnippetDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Dynamic Route Segment: /snippets/[id]
 * 
 * Next.js 15+ Concept:
 * In Next.js 15 and 16, `params` is a Promise that MUST be awaited:
 * `const { id } = await params;`
 */
export default async function SnippetDetailPage({ params }: SnippetDetailPageProps) {
  const { id } = await params;
  const snippet = await getSnippetById(id);

  if (!snippet) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Navigation Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to explore feed</span>
      </Link>

      <article className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm" className="capitalize font-mono">
                {snippet.language}
              </Badge>
              <span className="text-xs text-zinc-400">•</span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Eye className="h-3.5 w-3.5" />
                {snippet.viewsCount} views
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {snippet.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {snippet.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <LikeButton
              snippetId={snippet.id}
              initialLikes={snippet.likesCount}
              initialLiked={snippet.isLiked}
            />
          </div>
        </div>

        {/* Author Section */}
        <div className="my-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={snippet.author.avatarUrl}
              alt={snippet.author.name}
              className="h-10 w-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {snippet.author.name}
              </p>
              <p className="text-xs text-zinc-500">@{snippet.author.username}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-400">Published on</span>
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
              {new Date(snippet.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Code View Block */}
        <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-100 shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
            <span className="font-semibold uppercase tracking-wider text-zinc-300">{snippet.language} snippet</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre leading-relaxed">
            <code>{snippet.code}</code>
          </pre>
        </div>

        {/* Tags list */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Tag className="h-3.5 w-3.5 text-zinc-400 mr-1" />
          {snippet.tags.map((tag) => (
            <Link key={tag} href={`/?tag=${tag}`}>
              <Badge variant="secondary" size="sm">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
