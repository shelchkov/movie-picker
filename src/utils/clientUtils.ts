import { type MovieType } from './types'

export const getMovieTitle = (movie: MovieType) => {
  let title = movie.titleText.text

  if (movie.releaseDate?.year) {
    title += ` (${movie.releaseDate.year})`
  }

  return title
}
