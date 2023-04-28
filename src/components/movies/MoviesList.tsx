import { h } from 'preact'
import { getDataFromImageCaption } from '../../utils/utils'
import { type MovieType } from '../../utils/types'
import { MovieCard } from './ui/MovieCard'
import { ScreenContainer } from '../ui/ScreenContainer'

interface Props {
  movies: MovieType[] | undefined
  error?: string
}

const imgHeight = 300

export const MoviesList = ({ movies }: Props) => {
  if (!movies?.length) {
    return <ScreenContainer>Movies not found</ScreenContainer>
  }

  return (
    <>
      {movies.map((movie) => {
        const { title, cast, alternativeTitle } = getDataFromImageCaption(movie)
        const { width, height } = movie.primaryImage
        const imgWidth = (imgHeight / height) * width

        return (
          <MovieCard
            imageSrc={movie.primaryImage.url}
            title={title}
            imageAlt={movie.primaryImage.caption.plainText}
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            cast={cast || alternativeTitle}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            key={movie.id}
          />
        )
      })}
    </>
  )
}
