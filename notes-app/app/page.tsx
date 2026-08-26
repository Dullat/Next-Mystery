import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
      <h1 className="text-5xl font-bold text-gray-900">The Ultimate Notes App</h1>
      <p className="text-lg text-gray-600">Capture your thoughts, securely.</p>

      {/* Link is the Next.js standard for internal navigation. It pre-fetches the page for instant loading. */}
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
