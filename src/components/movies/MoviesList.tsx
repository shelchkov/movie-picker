import { type RefObject, h } from 'preact'
import { getDataFromImageCaption } from '../../utils/utils'
import { type MovieType } from '../../utils/types'
import { MovieCard } from './ui/MovieCard'
import { ScreenContainer } from '../ui/ScreenContainer'

interface Props {
  movies: MovieType[] | undefined
  error?: string
  lastMovieCardRef?: RefObject<HTMLDivElement>
}

const imgHeight = 300

export const MoviesList = ({ movies, lastMovieCardRef }: Props) => {
  if (movies?.length === 0) {
    return <ScreenContainer>Movies not found</ScreenContainer>
  }

  return (
    <>
      {movies?.map((movie, index) => {
        const { title, cast, alternativeTitle } = getDataFromImageCaption(movie)
        const { width, height } = movie.primaryImage
        const imgWidth = (imgHeight / height) * width
        const isLast = index === movies.length - 1

        return (
          <MovieCard
            imageSrc={movie.primaryImage.url}
            title={title}
            imageAlt={movie.primaryImage.caption.plainText}
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            cast={cast || alternativeTitle}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            reference={isLast ? lastMovieCardRef : undefined}
            key={movie.id}
          />
        )
      })}
    </>
  )
}
