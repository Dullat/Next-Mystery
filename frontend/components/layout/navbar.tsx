import Link from "next/link";
import { Code2, Plus, Flame, Compass } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-zinc-900 dark:text-white group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-white dark:text-zinc-950">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold leading-none">DevPulse</span>
              <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Snippet Engine</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
            <Link
              href="/?sort=trending"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <Flame className="h-4 w-4" />
              <span>Trending</span>
            </Link>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/snippets/create"
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            <Plus className="h-4 w-4" />
            <span>New Snippet</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
