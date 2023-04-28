import { type MovieType } from './types'

export const getPopularMovies = async (
  page = 1,
  top250?: boolean,
): Promise<{ page: string; results: MovieType[] }> => {
  let url = `./api/popular-movies?page=${page}`

  if (top250) {
    url += `&top250=true`
  }

  const res = await fetch(url)
  const data = await res.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data
}

export const pickMovie = async (pick: string, against: string) => {
  const res = await fetch('/api/pick-movie', {
    method: 'POST',
    body: JSON.stringify({ pick, against }),
  })

  return res.json()
}
