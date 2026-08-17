"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ActionResponse, Language, Snippet } from "@/types";
import { MOCK_SNIPPETS, MOCK_USERS } from "@/lib/data";

/**
 * 1. Zod Runtime Validation Schema
 * 
 * TypeScript + Zod Synergy:
 * Zod validates incoming FormData at runtime, protecting against malicious or malformed payloads.
 */
export const CreateSnippetSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title is too long (max 100 chars)"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description is too long (max 300 chars)"),
  language: z.enum([
    "typescript",
    "javascript",
    "python",
    "rust",
    "go",
    "sql",
    "css",
    "html",
    "json",
  ]),
  code: z
    .string()
    .min(10, "Snippet code must be at least 10 characters")
    .max(5000, "Code is too large"),
  tags: z
    .string()
    .min(2, "Add at least one tag")
    .transform((val) =>
      val
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
    ),
});

/**
 * 2. Next.js 15+ Server Action (Replaces Express Controllers)
 * 
 * Notice:
 * - Marked with `"use server"`
 * - Directly callable from React 19 `useActionState`
 * - Returns a typed `ActionResponse`
 */
export async function createSnippetAction(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  // Simulate small server latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    language: formData.get("language"),
    code: formData.get("code"),
    tags: formData.get("tags"),
  };

  // Safe parsing with Zod
  const validationResult = CreateSnippetSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Please fix the validation errors below.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { title, description, language, code, tags } = validationResult.data;

  // Create new Snippet model
  const newSnippet: Snippet = {
    id: `snip-${Date.now()}`,
    title,
    description,
    code,
    language: language as Language,
    tags,
    authorId: "u1", // Default current logged-in user
    author: MOCK_USERS["u1"],
    likesCount: 0,
    viewsCount: 1,
    isLiked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Insert into memory store
  MOCK_SNIPPETS.unshift(newSnippet);

  // Invalidate cache so Next.js re-renders "/" with the new item
  revalidatePath("/");

  return {
    success: true,
    message: "Snippet published successfully!",
    data: newSnippet,
  };
}
