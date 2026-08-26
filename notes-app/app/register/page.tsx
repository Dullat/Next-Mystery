// app/register/page.tsx
import { registerUser } from "@/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <div className="w-full max-w-md p-8 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

        {/* We pass our Server Action directly into the form's 'action' attribute */}
        <form action={registerUser} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition mt-2 font-medium"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
