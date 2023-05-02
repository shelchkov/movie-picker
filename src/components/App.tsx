import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Movie } from './index/Movie'
import { NotSureButton } from './index/NotSureButton'

import { getPopularMovies, pickMovie } from '../utils/requests'
import { type MovieType } from '../utils/types'
import { ScreenContainer } from './ui/ScreenContainer'
import { getRandomPage, getDataFromImageCaption } from '../utils/utils'

const checkedPages = new Set<number>()

export const App = () => {
  const [movies, setMovies] = useState<MovieType[]>()
  const [error, setError] = useState<string>()

  const getNextPage = async () => {
    try {
      const data = await getPopularMovies(getRandomPage(24, checkedPages), true)
      setMovies((movies) => [...(movies ?? []), ...data.results])
      data.page && checkedPages.add(parseInt(data.page, 10))
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

  const handlePick = (index: number) => {
    if (movies && movies?.length > 1) {
      pickMovie(movies?.[index].id, movies?.[(index + 1) % 2].id)
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

  if (!movies || movies.length === 0) {
    return <ScreenContainer>Loading...</ScreenContainer>
  }

  const firstImage = movies[0].primaryImage
  const secondImage = movies[1].primaryImage
  const imageWidth = Math.min(firstImage.width, secondImage.width, 400)

  return (
    <main class="p-8">
      <div class="flex justify-evenly">
        {[
          movies.slice(0, 2).map((movie, index) => {
            const image = movie.primaryImage
            const imageHeight = (imageWidth / image.width) * image.height
            const { cast, title, alternativeTitle } =
              getDataFromImageCaption(movie)
            const pick = () => handlePick(index)

            return (
              <Movie
                key={image.url}
                imageSrc={image.url}
                imageAlt={image.caption.plainText}
                width={imageWidth}
                height={imageHeight}
                title={title}
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                cast={cast || alternativeTitle}
                pick={pick}
              />
            )
          }),
        ]}
      </div>

      <NotSureButton handleSkip={handleSkip} />
    </main>
  )
}
