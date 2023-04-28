import { type MovieType } from './types'

export const getRandomPage = (maxPage = 999, skip?: Set<number>) => {
  const result = Math.floor(Math.random() * (maxPage + 1))

  if (skip?.has(result)) {
    return getRandomPage(maxPage, skip)
  }

  return result
}

// export const preloadImage = (src: string) => {
//   new Image().src = src
// }

export const getDataFromImageCaption = (
  movie: MovieType,
): { cast?: string; title: string; alternativeTitle?: string } => {
  const caption = movie.primaryImage.caption.plainText
  const title = movie.titleText.text

  if (!caption) {
    return { title }
  }

  const indexOfTitle = caption.indexOf(title)

  if (indexOfTitle === -1) {
    return { title: caption, alternativeTitle: title }
  }

  if (indexOfTitle === 0) {
    return { title: caption }
  }

  const cast = caption.slice(0, indexOfTitle - 4)
  const titleWithYear = caption.slice(indexOfTitle)

  return { cast, title: titleWithYear }
}
