export interface MovieType {
  id: string
  primaryImage: {
    height: number
    width: number
    url: string
    caption: {
      plainText: string
    }
  }
  titleText: {
    text: string
  }
  releaseDate: {
    year: number
    day: number
    month: number
  } | null
}

export interface DBMovie {
  movieId: string
  rating: number
}
