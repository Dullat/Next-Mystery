"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { Language } from "@/types";
import { cn } from "@/lib/utils";

const LANGUAGES: { label: string; value: Language | "all" }[] = [
  { label: "All Languages", value: "all" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "SQL", value: "sql" },
];

/**
 * Client Component: FilterBar
 * 
 * Demonstrates URL-Driven State Management:
 * Instead of keeping filter state inside React `useState` (which would require React Context or Redux),
 * we push searchParams to the URL (`?lang=typescript&q=react`).
 * 
 * Next.js automatically triggers a server re-render for the page with the new searchParams!
 */
export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get("lang") || "all";
  const currentQuery = searchParams.get("q") || "";

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleLanguageSelect = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (lang !== "all") {
      params.set("lang", lang);
    } else {
      params.delete("lang");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search Input Box */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          defaultValue={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search snippets by title, tag, or keyword..."
          className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-sm text-zinc-900 shadow-xs placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      {/* Language Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        {LANGUAGES.map((item) => {
          const isActive = currentLang === item.value;
          return (
            <button
              key={item.value}
              onClick={() => handleLanguageSelect(item.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-zinc-900 text-white shadow-xs dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
