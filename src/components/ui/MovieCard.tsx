import { h } from 'preact'
import { type DBMovie } from '../../utils/types'

type Props = DBMovie

export const MovieCard = ({ imageSrc, title }: Props) => (
  <div class="flex p-2">
    <img src={imageSrc} height={150} width={150} class="mr-2" />
    <p>{title}</p>
  </div>
)
