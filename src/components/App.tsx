import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Movie } from './Movie'
import { NotSureButton } from "./NotSureButton"

import { getPopularMovies } from '../utils/getClientMovies'
import { MovieType } from '../utils/types'

export const App = () => {
  const [movies, setMovies] = useState<MovieType[]>()

  const getNextMovies = () => {
    setMovies(movies => movies.slice(2))
  }
  
  const handleSkip = () => {
    getNextMovies()
  }

  const pickFirstMovie = () => {
    console.log("Pick", movies[0].id)
    getNextMovies()
  }

  const pickSecondMovie = () => {
    console.log("Pick", movies[1].id)
    getNextMovies()
  }

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await getPopularMovies(2)
        setMovies(data.results)
      } catch (error) {
        console.warn(error)
      }
    }

    getMovies()
  }, [])

  if (!movies) {
    return (
      <div>Loading...</div>
    )
  }

  const imageWidth = Math.min(movies[0].primaryImage.width, movies[1].primaryImage.width, 400)
  const firstHeight = imageWidth / movies[0].primaryImage.width * movies[0].primaryImage.height
  const secondHeight = imageWidth / movies[1].primaryImage.width * movies[1].primaryImage.height

  return (
    <div>
      <div class="flex justify-evenly">
        <Movie imageSrc={movies[0].primaryImage.url} width={imageWidth} height={firstHeight} pick={pickFirstMovie} />
        <Movie imageSrc={movies[1].primaryImage.url} width={imageWidth} height={secondHeight} pick={pickSecondMovie} />
      </div>

      <NotSureButton handleSkip={handleSkip} />
    </div>
  )
}
