import { type MovieType } from './types'

// export const preloadImage = (src: string) => {
//   new Image().src = src
// }

export const getDataFromImageCaption = (
  movie: MovieType,
): { cast?: string; title: string } => {
  const caption = movie.primaryImage.caption.plainText
  const title = movie.titleText.text

  if (!caption) {
    return { title: caption }
  }

  const indexOfTitle = caption.indexOf(title)

  if (indexOfTitle < 1) {
    return { title: caption }
  }

  const cast = caption.slice(0, indexOfTitle - 4)
  const titleWithYear = caption.slice(indexOfTitle)

  return { cast, title: titleWithYear }
}
