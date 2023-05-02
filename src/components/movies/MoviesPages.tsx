import { useEffect, useRef } from 'preact/hooks'
import { signal } from '@preact/signals'
import { type MovieType } from '../../utils/types'
import { MoviesList } from './MoviesList'
import { getMoviesByIds } from '../../utils/requests'
import { createRef } from 'preact'

interface Props {
  moviesIds: string[]
  pageSize: number
  movies: MovieType[] | undefined
}

const moviesList = signal<MovieType[] | undefined>(undefined)
const isLoading = signal(false)
const error = signal<string | undefined>(undefined)

export const MoviesPages = ({ moviesIds, pageSize, movies }: Props) => {
  const nextIds = useRef(moviesIds)
  const lastMovieCardRef = createRef<HTMLDivElement>()

  const loadNextPage = async () => {
    if (isLoading.value || nextIds.current.length === 0) {
      return
    }

    isLoading.value = true
    error.value = undefined

    try {
      const data = await getMoviesByIds(nextIds.current.slice(0, pageSize))
      moviesList.value = [...(moviesList.value ?? []), ...data]
    } catch (errorMessage) {
      console.warn(errorMessage)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      error.value = `${errorMessage}`
    }

    nextIds.current = nextIds.current.slice(pageSize)
    isLoading.value = false
  }

  useEffect(() => {
    moviesList.value = movies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!lastMovieCardRef.current) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadNextPage()
      }
    })

    const element = lastMovieCardRef.current
    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesList.value])

  return (
    <>
      <div class="flex flex-wrap justify-center">
        <MoviesList
          movies={moviesList.value}
          lastMovieCardRef={lastMovieCardRef}
        />
      </div>
      {isLoading.value && <div class="text-center p-6 text-base">Loading</div>}
      {error.value && (
        <div class="text-center p-6 text-base">Something went wrong</div>
      )}
    </>
  )
}
