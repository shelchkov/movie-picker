export const getRandomPage = (maxPage = 999) =>
  Math.floor(Math.random() * (maxPage + 1))
