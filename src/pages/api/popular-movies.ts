import { type APIContext } from 'astro'
import { getPopularMovies, getTopMovies } from '../../utils/getMovies'

export const get = async ({ request: { url } }: APIContext) => {
  try {
    const params = new URLSearchParams(new URL(url).search)
    const page = parseInt(params.get('page') ?? '1', 10) || 1
    const top250 = !!params.get('top250')

    const data = await (top250 ? getTopMovies(page) : getPopularMovies(page))

    if (data.error ?? data.message) {
      return new Response(
        JSON.stringify({ error: data.error ?? data.message }),
        { status: 403 },
      )
    }

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }
}
