enum MoviesList {
  POPULAR = 'most_pop_movies'
}

enum MoviesInfo {
  BASE = 'base_info'
}

const host = 'moviesdatabase.p.rapidapi.com'
const getUrl = (page?: number, list?: MoviesList) => {
  let url = `https://${host}/titles?`

  if (page) {
    url += `page=${page}&`
  }

  if (list) {
    url += `list=${list}&`
  }

  return url.slice(0, url.length - 1)
}

export const getMovies = async (page?: number, list?: MoviesList) => {
  const res = await fetch(getUrl(page, list), {
    headers: {
      'X-RapidAPI-Key': import.meta.env.RAPID_API_KEY,
      'X-RapidAPI-Host': host
    }
  })

  return res.json()
}

export const getPopularMovies = (page?: number) => getMovies(page, MoviesList.POPULAR)
