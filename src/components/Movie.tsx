import { h } from 'preact'

import { Button } from './ui/Button'

interface Props {
  imageSrc: string
  imageAlt?: string
  width?: number
  height?: number
  title: string
  pick: () => void
}

export const Movie = ({
  imageSrc,
  imageAlt,
  width,
  height,
  title,
  pick,
}: Props) => (
  <div class="p-5 flex flex-col items-center justify-between">
    <img
      src={imageSrc}
      class="mb-3"
      width={width}
      height={height}
      alt={imageAlt}
    />

    <div class="text-center">
      <p class="mb-3 text-base">{title}</p>
      <Button handleClick={pick}>Pick</Button>
    </div>
  </div>
)
