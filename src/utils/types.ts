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
    test: string
  }
}