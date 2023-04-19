import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Movie } from './Movie'
import { NotSureButton } from './NotSureButton'

import { getPopularMovies } from '../utils/getClientMovies'
import { type MovieType } from '../utils/types'
import { ScreenContainer } from './ui/ScreenContainer'
import { getRandomPage } from '../utils/utils'
import { getMovieTitle } from '../utils/clientUtils'
import { pickMovie } from '../utils/pickClientMovie'

const checkedPages = new Set<number>()

export const App = () => {
  const [movies, setMovies] = useState<MovieType[]>()
  const [error, setError] = useState<string>()

  const getNextPage = async () => {
    try {
      const data = await getPopularMovies(getRandomPage(24, checkedPages), true)
      setMovies((movies) => [...(movies ?? []), ...data.results])
      data.page && checkedPages.add(data.page)
    } catch (error) {
      console.warn(error)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      setError(`${error}`)
    }
  }

  const getNextMovies = () => {
    setMovies((movies) => movies?.slice(2))

    if (movies && movies.length <= 4) {
      getNextPage()
    }
  }

  const handleSkip = () => {
    getNextMovies()
  }

  const pickFirstMovie = () => {
    if (movies && movies?.length > 1) {
      pickMovie(movies?.[0].id, movies?.[1].id)
    }

    getNextMovies()
  }

  const pickSecondMovie = () => {
    if (movies && movies?.length > 1) {
      pickMovie(movies?.[1].id, movies?.[0].id)
    }

    getNextMovies()
  }

  useEffect(() => {
    getNextPage()
  }, [])

  // useEffect(() => {
  //   movies?.slice(2, 4).forEach(({ primaryImage: { url } }) => {
  //     setTimeout(() => preloadImage(url))
  //   })
  // }, [movies])

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
          title={getMovieTitle(movies[0])}
          pick={pickFirstMovie}
        />
        <Movie
          imageSrc={secondImage.url}
          imageAlt={secondImage.caption.plainText}
          width={imageWidth}
          height={secondHeight}
          title={getMovieTitle(movies[1])}
          pick={pickSecondMovie}
        />
      </div>

      <NotSureButton handleSkip={handleSkip} />
    </main>
  )
}
