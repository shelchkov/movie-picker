import { FunctionalComponent, h } from 'preact'

interface Props {
  handleClick: () => void
}

export const Button: FunctionalComponent<Props> = ({ handleClick, children }) =>
  <button
    class="py-2.5 px-6 rounded-lg border-0 border-lime-300 bg-green-800 text-lime-300 cursor-pointer active:border"
    onClick={handleClick}>
      {children}
  </button>
