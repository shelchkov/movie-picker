import { type APIContext } from 'astro'

export const post = async ({ request }: APIContext) => {
  const reqData = await request.json()
  console.log(reqData)

  return new Response(JSON.stringify({ success: true }))
}
