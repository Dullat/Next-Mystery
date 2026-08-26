import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added dark:bg-zinc-950 and dark:text-zinc-50 for the global dark theme
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <nav className="border-b border-zinc-200 bg-white/50 px-8 py-4 flex justify-between items-center backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2 font-bold tracking-tight">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>NotesApp</span>
        </div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
          Log Out
        </Link>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
