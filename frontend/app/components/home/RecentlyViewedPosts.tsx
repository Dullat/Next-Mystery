export default async function RecentlyViewedPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
  const data = await res.json()
  await new Promise(res => setTimeout(res, 5000))

  return (
    <div>
      {
        data.map(post => (<p key={post.id}>{post.body}</p>))
      }
    </div>
  )
}
