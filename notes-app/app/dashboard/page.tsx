import { Suspense } from "react";
import { BookMarked, Plus } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// ... (Keep your NoteFeedSkeleton here) ...

export default async function DashboardPage() {
  // We already know they are logged in because the layout checked, 
  // but we need the session to grab their specific user ID.
  const session = await auth();

  // Fetch real notes from PostgreSQL matching this exact user
  const userNotes = await prisma.note.findMany({
    where: { authorId: session?.user?.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookMarked className="h-3.5 w-3.5" />
          <span>Personal Workspace</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your Notes
          </h1>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userNotes.length === 0 ? (
          <p className="text-zinc-500">No notes yet. Create your first one!</p>
        ) : (
          userNotes.map((note) => (
            <div
              key={note.id}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 hover:shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{note.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {note.content}
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-zinc-500 dark:text-zinc-500">
                {note.createdAt.toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
