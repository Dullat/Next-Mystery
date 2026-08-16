"use server";

import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  console.log(title, content)

  revalidatePath("/posts")
}
