import React from 'react'
import { Typography } from './components/Typography'
import { Button } from './components/Button'

import WebpackLogo from './assets/images/webpack_logo.png'
import ReactLogo from './assets/images/react_logo.png'

export default function App() {
  return (
    <>
      <div className="main">
        <div className="logos">
          <img src={WebpackLogo} width={257} height={100} alt="webpack" />
          <img src={ReactLogo} width={75} height={65} alt="react" />
        </div>
        <Typography>
          What date is it? { new Date().toDateString() }
        </Typography>
        <Button>
          Load Date
        </Button>
      </div>
    </>
  )
}
