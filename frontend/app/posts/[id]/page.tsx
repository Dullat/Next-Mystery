import { notFound } from "next/navigation"

export default async function Post({ params }) {
  // learn about params, searchParams etc
  const { id } = await params

  // const cookiesStore = cookes()

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) {
    return notFound()
  }
  const data = await res.json()
  return (
    <div>{data.body}</div>
  )
}
