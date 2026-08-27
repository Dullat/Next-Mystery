import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { BookOpen, LogOut } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Read the HTTP-only cookie to check the session
  const session = await auth();

  // 2. If no session exists, instantly kick them to the login page
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <nav className="border-b border-zinc-200 bg-white/50 px-8 py-4 flex justify-between items-center backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2 font-bold tracking-tight">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>NotesApp</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-500">
            {session.user.email}
          </span>

          {/* Native Auth.js Sign Out Form */}
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
            <button type="submit" className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
