import { h } from 'preact'

interface Props {
  imageSrc: string
  title: string
  imageAlt?: string
}

export const MovieCard = ({ imageSrc, title, imageAlt }: Props) => (
  <div class="flex p-2">
    <img src={imageSrc} height={150} width={150} class="mr-2" alt={imageAlt} />
    <p>{title}</p>
  </div>
)
