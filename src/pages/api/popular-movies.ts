import { APIContext } from "astro"
import { getPopularMovies } from "../../utils/getMovies"

export const get = async ({ request: { url } }: APIContext) => {
  const params = new URLSearchParams(new URL(url).search)
  const page = parseInt(params.get("page")) || 1

  const data = await getPopularMovies(page)

  return new Response(JSON.stringify(data))
}
