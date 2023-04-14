import { Button } from "./ui/Button"

interface Props {
  imageSrc: string
  width?: number
  height?: number
  pick: () => void
}

export const Movie = ({ imageSrc, width, height, pick }: Props) => (
  <div class="p-5 flex flex-col items-center justify-between">
    <img src={imageSrc} class="mb-3" width={width} height={height} />

    <Button handleClick={pick}>Pick</Button>
  </div>
)
