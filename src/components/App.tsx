import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Movie } from './Movie'
import { NotSureButton } from './NotSureButton'

import { getPopularMovies } from '../utils/getClientMovies'
import { type MovieType } from '../utils/types'
import { ScreenContainer } from './ui/ScreenContainer'

export const App = () => {
  const [movies, setMovies] = useState<MovieType[]>()
  const [error, setError] = useState<string>()

  const getNextMovies = () => {
    setMovies((movies) => movies?.slice(2))
  }

  const handleSkip = () => {
    getNextMovies()
  }

  const pickFirstMovie = () => {
    console.log('Pick', movies?.[0].id)
    getNextMovies()
  }

  const pickSecondMovie = () => {
    console.log('Pick', movies?.[1].id)
    getNextMovies()
  }

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getPopularMovies(3)
        setMovies(data.results)
      } catch (error) {
        console.warn(error)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        setError(`${error}`)
      }
    }

    getMovies()
  }, [])

  if (error) {
    return <ScreenContainer>Something went wrong</ScreenContainer>
  }

  if (!movies) {
    return <ScreenContainer>Loading...</ScreenContainer>
  }

  const imageWidth = Math.min(
    movies[0].primaryImage.width,
    movies[1].primaryImage.width,
    400,
  )
  const firstHeight =
    (imageWidth / movies[0].primaryImage.width) * movies[0].primaryImage.height
  const secondHeight =
    (imageWidth / movies[1].primaryImage.width) * movies[1].primaryImage.height

  return (
    <main class="p-8">
      <div class="flex justify-evenly">
        <Movie
          imageSrc={movies[0].primaryImage.url}
          imageAlt={movies[0].primaryImage.caption.plainText}
          width={imageWidth}
          height={firstHeight}
          title={`${movies[0].titleText.text} (${movies[0].releaseDate.year})`}
          pick={pickFirstMovie}
        />
        <Movie
          imageSrc={movies[1].primaryImage.url}
          imageAlt={movies[1].primaryImage.caption.plainText}
          width={imageWidth}
          height={secondHeight}
          title={`${movies[1].titleText.text} (${movies[1].releaseDate.year})`}
          pick={pickSecondMovie}
        />
      </div>

      <NotSureButton handleSkip={handleSkip} />
    </main>
  )
}
