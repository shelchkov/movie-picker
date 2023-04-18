import { h, type FunctionalComponent } from 'preact'

export const ScreenContainer: FunctionalComponent = ({ children }) => (
  <div class="h-screen flex items-center justify-center">{children}</div>
)
