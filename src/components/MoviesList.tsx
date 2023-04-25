import { signal } from '@preact/signals'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { getDataFromImageCaption } from '../utils/clientUtils'
import { getDBMovies } from '../utils/getClientMovies'
import { type MovieType } from '../utils/types'
import { LoadingComponent } from './ui/LoadingComponent'
import { MovieCard } from './ui/MovieCard'
import { ScreenContainer } from './ui/ScreenContainer'

const movies = signal<MovieType[] | undefined>(undefined)
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
          {movies.value?.map((movie) => {
            const { title } = getDataFromImageCaption(movie)

            return (
              <MovieCard
                imageSrc={movie.primaryImage.url}
                title={title}
                imageAlt={movie.primaryImage.caption.plainText}
                key={movie.id}
              />
            )
          })}
        </div>
      )}
    </LoadingComponent>
  )
}
