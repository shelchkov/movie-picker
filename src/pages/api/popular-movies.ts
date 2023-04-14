import { APIContext } from "astro"
import { getPopularMovies } from "../../utils/getMovies"

export const get = async ({ request: { url } }: APIContext) => {
  try {
    const params = new URLSearchParams(new URL(url).search)
    const page = parseInt(params.get("page")) || 1

    const data = await getPopularMovies(page)

    if (data.error || data.message) {
      return new Response(JSON.stringify({ error: data.error || data.message }), { status: 403 })
    }

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(null, { status: 500, statusText: error })
  }
}
