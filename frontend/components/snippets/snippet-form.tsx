"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSnippetAction } from "@/actions/snippets";
import { ActionResponse, Language } from "@/types";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

const initialState: ActionResponse = {
  success: false,
};

const LANGUAGES: Language[] = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "sql",
  "css",
  "html",
  "json",
];

/**
 * Client Component: SnippetForm
 * 
 * Powered by React 19's `useActionState`:
 * - Handles progressive form submission without manual Axios/fetch
 * - Receives server-validated error bags
 * - Disables inputs during pending server transitions
 */
export function SnippetForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createSnippetAction, initialState);

  // When creation is successful, redirect after brief notification
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {/* Top Banner for Global Feedback */}
      {state.success && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{state.message} Redirecting to explore feed...</span>
        </div>
      )}

      {state.errors && !state.success && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{state.message || "Please resolve the errors below."}</span>
        </div>
      )}

      {/* Snippet Title */}
      <div>
        <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
          Snippet Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Next.js 15 Async Params Helper"
          disabled={isPending}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-xs focus:border-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 disabled:opacity-50"
        />
        {state.errors?.title && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{state.errors.title[0]}</p>
        )}
      </div>

      {/* Language & Tags Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="language" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
            Programming Language
          </label>
          <select
            id="language"
            name="language"
            defaultValue="typescript"
            disabled={isPending}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-xs focus:border-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 capitalize disabled:opacity-50"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {state.errors?.language && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{state.errors.language[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="nextjs, typescript, react"
            disabled={isPending}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-xs focus:border-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 disabled:opacity-50"
          />
          {state.errors?.tags && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{state.errors.tags[0]}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
          Description & Use Case
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          placeholder="Briefly describe what this snippet accomplishes and when to use it..."
          disabled={isPending}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-xs focus:border-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 disabled:opacity-50"
        />
        {state.errors?.description && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{state.errors.description[0]}</p>
        )}
      </div>

      {/* Code Area */}
      <div>
        <label htmlFor="code" className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
          Code Snippet
        </label>
        <textarea
          id="code"
          name="code"
          rows={8}
          placeholder="// Paste your code here..."
          disabled={isPending}
          className="w-full rounded-xl border border-zinc-200 bg-zinc-950 px-4 py-3 font-mono text-xs text-zinc-100 shadow-xs focus:border-zinc-500 focus:outline-none dark:border-zinc-800 disabled:opacity-50"
        />
        {state.errors?.code && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{state.errors.code[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button type="submit" size="md" isLoading={isPending}>
          <Sparkles className="h-4 w-4" />
          <span>{isPending ? "Validating & Publishing..." : "Publish Snippet"}</span>
        </Button>
      </div>
    </form>
  );
}
