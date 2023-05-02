import { type RefObject, h } from 'preact'

interface Props {
  imageSrc: string
  title: string
  imageAlt?: string
  cast?: string
  imgWidth: number
  imgHeight: number
  reference?: RefObject<HTMLDivElement>
}

export const MovieCard = ({
  imageSrc,
  title,
  imageAlt,
  cast,
  imgWidth,
  imgHeight,
  reference,
}: Props) => (
  <div
    class="flex p-2 m-2 w-128 border border-zinc-500 rounded"
    ref={reference}
  >
    <img
      src={imageSrc}
      height={imgHeight}
      width={imgWidth}
      class="mr-2"
      alt={imageAlt}
    />

    <div class="flex flex-col">
      <p class="text-base">{title}</p>
      {cast && <p class="mb-3 text-sm font-light">{cast}</p>}
    </div>
  </div>
)
