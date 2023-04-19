import { h } from 'preact'

import { Button } from './ui/Button'

interface Props {
  imageSrc: string
  imageAlt?: string
  width?: number
  height?: number
  title: string
  cast?: string
  pick: () => void
}

export const Movie = ({
  imageSrc,
  imageAlt,
  width,
  height,
  title,
  cast,
  pick,
}: Props) => (
  <div class="p-5 flex flex-col items-center justify-between max-w-md">
    <img
      src={imageSrc}
      class="mb-3"
      width={width}
      height={height}
      alt={imageAlt}
      key={imageSrc}
    />

    <div class="text-center">
      <p class="mb-3 text-base">{title}</p>
      {cast && <p class="mb-3 text-sm font-light">{cast}</p>}
      <Button handleClick={pick}>Pick</Button>
    </div>
  </div>
)
