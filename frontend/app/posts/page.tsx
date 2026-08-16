import Link from "next/link"
import { Suspense } from "react"
import RecentlyViewedPosts from "../components/home/RecentlyViewedPosts"

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")

  const data = await res.json()

  return (
    <main>
      <h1>Posts</h1>

      <div>
        {data.slice(0, 5).map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </Link>
          </li>
        ))}
      </div>

      <Suspense fallback={<p>Loading......</p>}>
        <RecentlyViewedPosts />
      </Suspense>
    </main>
  )
}
