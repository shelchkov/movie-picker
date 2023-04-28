import { type FunctionalComponent, h } from 'preact'
import { ScreenContainer } from './ScreenContainer'

interface Props {
  isLoading: boolean
  error?: string
}

export const LoadingComponent: FunctionalComponent<Props> = ({
  isLoading,
  error,
  children,
}) => {
  if (error) {
    return <ScreenContainer>Something went wrong</ScreenContainer>
  }

  if (isLoading) {
    return <ScreenContainer>Loading...</ScreenContainer>
  }

  return <main class="p-8">{children}</main>
}
