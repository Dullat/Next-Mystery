export async function GET() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`)
  const posts = await res.json()
  return Response.json(posts)
}
