import { signal } from '@preact/signals'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { getDBMovies } from '../utils/getClientMovies'
import { type DBMovie } from '../utils/types'
import { LoadingComponent } from './ui/LoadingComponent'
import { MovieCard } from './ui/MovieCard'
import { ScreenContainer } from './ui/ScreenContainer'

const movies = signal<DBMovie[] | undefined>(undefined)
const error = signal<string | undefined>(undefined)

export const MoviesList = () => {
  useEffect(() => {
    getDBMovies()
      .then((data) => {
        movies.value = data.movies
      })
      .catch((errorMessage) => {
        console.warn(errorMessage)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        error.value = `${errorMessage}`
      })
  }, [])

  return (
    <LoadingComponent isLoading={!movies.value} error={error.value}>
      {!movies.value?.length ? (
        <ScreenContainer>Movies not found</ScreenContainer>
      ) : (
        <div>
          {movies.value?.map((movie) => (
            <MovieCard {...movie} key={movie.movieId} />
          ))}
        </div>
      )}
    </LoadingComponent>
  )
}
