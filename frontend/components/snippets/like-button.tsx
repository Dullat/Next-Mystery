"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  snippetId: string;
  initialLikes: number;
  initialLiked?: boolean;
}

/**
 * Interactive Client Component: LikeButton
 * 
 * Notice the Architecture:
 * 1. Marked with `"use client"` because it handles user clicks and client state.
 * 2. It accepts serializable primitives (`string`, `number`, `boolean`) from its parent Server Component.
 * 3. It gives instant local UI feedback.
 */
export function LikeButton({
  snippetId,
  initialLikes,
  initialLiked = false,
}: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating if clicked inside a Link
    e.stopPropagation();

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }

    // In upcoming milestones, we trigger a Server Action here:
    // await toggleLikeAction(snippetId);
  };

  return (
    <button
      onClick={handleToggleLike}
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200",
        isLiked
          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800"
      )}
      title={isLiked ? "Unlike snippet" : "Like snippet"}
    >
      <Heart
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-200",
          isLiked && "fill-current text-rose-500",
          isAnimating && "scale-125"
        )}
      />
      <span>{likes}</span>
    </button>
  );
}
