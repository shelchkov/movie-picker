import { type MovieType } from './types'

export const getPopularMovies = async (
  page = 1,
): Promise<{ page: number; results: MovieType[] }> => {
  const res = await fetch(`./api/popular-movies?page=${page}`)
  const data = await res.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data
}
