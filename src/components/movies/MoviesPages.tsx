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

  return (
    <>
      <MoviesList movies={movies.value} />
      {isLoading.value && <div>Loading</div>}
    </>
  )
}
