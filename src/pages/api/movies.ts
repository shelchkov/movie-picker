import { type APIContext } from 'astro'
import { getMoviesData } from '../../utils/getMovies'

export const get = async ({ request: { url } }: APIContext) => {
  const params = new URLSearchParams(new URL(url).search)
  const moviesIds = params.get('moviesIds')?.split(',')

  if (!moviesIds) {
    return new Response(
      JSON.stringify({ error: 'Property moviesIds is required' }),
      { status: 403 },
    )
  }

  const movies = await getMoviesData(moviesIds)

  return new Response(JSON.stringify(movies))
}
