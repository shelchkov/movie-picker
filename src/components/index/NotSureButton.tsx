import { h } from 'preact'

import { Button } from '../ui/Button'

interface Props {
  handleSkip: () => void
}

export const NotSureButton = ({ handleSkip }: Props) => (
  <div class="flex justify-center p-6">
    <Button handleClick={handleSkip}>Not Sure</Button>
  </div>
)
