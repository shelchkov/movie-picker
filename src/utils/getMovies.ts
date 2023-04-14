enum MoviesList {
  POPULAR = 'most_pop_movies'
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
  console.log(import.meta.env)
  console.log({ page, url: getUrl(page, list) })

  const res = await fetch(getUrl(page, list), {
    headers: {
      'X-RapidAPI-Key': import.meta.env.RAPID_API_KEY,
      'X-RapidAPI-Host': host
    }
  })

  return res.json()
}

export const getPopularMovies = (page?: number) => getMovies(page, MoviesList.POPULAR)
