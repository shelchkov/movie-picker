import { h } from 'preact'
import { getDataFromImageCaption } from '../utils/clientUtils'
import { type MovieType } from '../utils/types'
import { MovieCard } from './ui/MovieCard'
import { ScreenContainer } from './ui/ScreenContainer'

interface Props {
  movies: MovieType[] | undefined
  error?: string
}

export const MoviesList = ({ movies }: Props) => {
  if (!movies?.length) {
    return <ScreenContainer>Movies not found</ScreenContainer>
  }

  return (
    <div>
      {movies.map((movie) => {
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
  )
}
