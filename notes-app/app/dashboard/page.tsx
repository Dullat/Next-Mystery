import { auth } from "@/auth"; // We will set this up next
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // 1. The server reads the cookie automatically
  const session = await auth();

  // 2. Unauthenticated? Kick them out instantly before rendering
  if (!session?.user) {
    redirect("/login");
  }

  // 3. Fetch ONLY the notes belonging to this specific cookie session
  const notes = await prisma.note.findMany({
    where: { authorId: session.user.id }
  });

  return (
    <div>
      <h1>Welcome back, {session.user.name}</h1>
      {/* render notes */}
    </div>
  );
}
