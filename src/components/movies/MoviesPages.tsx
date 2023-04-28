import { useEffect, useRef } from 'preact/hooks'
import { signal } from '@preact/signals'
import { type MovieType } from '../../utils/types'
import { MoviesList } from './MoviesList'
import { getMoviesByIds } from '../../utils/requests'

interface Props {
  moviesIds: string[]
  pageSize: number
}

const movies = signal<MovieType[] | undefined>(undefined)
const isLoading = signal(false)

const toggleLoading = (show: boolean) => {
  const container = document.querySelector(
    '#movies-loading-container',
  ) as HTMLDivElement
  container.style.display = show ? 'block' : 'none'
}

export const MoviesPages = ({ moviesIds, pageSize }: Props) => {
  const nextIds = useRef(moviesIds)

  const loadNextPage = async () => {
    if (isLoading.value) {
      return
    }

    console.log('Loading')
    isLoading.value = true

    try {
      const data = await getMoviesByIds(nextIds.current.slice(0, pageSize))
      movies.value = [...(movies.value ?? []), ...data]
    } catch (errorMessage) {
      // TODO: Handle Error
      console.warn(errorMessage)
    }

    nextIds.current = nextIds.current.slice(pageSize)
    isLoading.value = false
  }

  useEffect(() => {
    loadNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    toggleLoading(isLoading.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading.value])

  return <MoviesList movies={movies.value} />
}
