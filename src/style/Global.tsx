import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@kazamaswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

    @kazama-header {
    font-family: 'Luckiest Guy', cursive;
    font-style: regular;
    font-weight: 400;
    src: url("/fonts/LuckiestGuy-Regular.ttf") format('ttf')
  }
`

export default GlobalStyle
