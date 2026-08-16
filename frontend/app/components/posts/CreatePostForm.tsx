import { createPost } from "@/app/actions/createPost"

export default async function CreatePostForm() {

  return (<form action={createPost} >
    <input type="text" name="title" id="title" />
    <input type="text" name="content" id="content" />
    <button type="submit">post</button>
  </form>)
}
