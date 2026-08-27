"user server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createNote(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a Note")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  if (!title || !content) {
    throw new Error("Title and content is required")
  }

  await prisma.note.create({
    data: {
      title,
      content,
      authorId: session.user.id
    }
  })

  revalidatePath("/dashboard")
  redirect("/dashboard")
}
