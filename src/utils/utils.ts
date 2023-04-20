export const getRandomPage = (maxPage = 999, skip?: Set<number>) => {
  const result = Math.floor(Math.random() * (maxPage + 1))

  if (skip?.has(result)) {
    return getRandomPage(maxPage, skip)
  }

  return result
}
