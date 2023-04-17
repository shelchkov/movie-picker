import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Movie } from './Movie'
import { NotSureButton } from './NotSureButton'

import { getPopularMovies } from '../utils/getClientMovies'
import { type MovieType } from '../utils/types'
import { ScreenContainer } from './ui/ScreenContainer'
import { getRandomPage } from '../utils/utils'

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
        const data = await getPopularMovies(getRandomPage())
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

  const firstImage = movies[0].primaryImage
  const secondImage = movies[1].primaryImage

  const imageWidth = Math.min(firstImage.width, secondImage.width, 400)
  const firstHeight = (imageWidth / firstImage.width) * firstImage.height
  const secondHeight = (imageWidth / secondImage.width) * secondImage.height

  return (
    <main class="p-8">
      <div class="flex justify-evenly">
        <Movie
          imageSrc={firstImage.url}
          imageAlt={firstImage.caption.plainText}
          width={imageWidth}
          height={firstHeight}
          title={`${movies[0].titleText.text} (${movies[0].releaseDate.year})`}
          pick={pickFirstMovie}
        />
        <Movie
          imageSrc={secondImage.url}
          imageAlt={secondImage.caption.plainText}
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
