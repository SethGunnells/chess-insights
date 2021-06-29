import React, { FC } from 'react'
import { Global, css } from '@emotion/react'

import Games from './Games'

const globalStyles = css`
  body {
    background-color: #eceff4;
  }
`

const App: FC = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Games />
    </>
  )
}

export default App
