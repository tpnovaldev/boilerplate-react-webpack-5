/* eslint-disable max-len */
import React from 'react';
import Typography from './components/Typography';
import Button from './components/Button';

import WebpackLogo from './assets/images/webpack_logo.png';
import ReactLogo from './assets/images/react_logo.png';

export default function App() {
  const openButtonLink = () => {
    window.open(
      'https://github.com/tpnovaldev/boilerplate-react-webpack-5',
      '_blank',
    );
  };

  return (
    <div className="main">
      <div className="logos">
        <img src={WebpackLogo} width={257} height={100} alt="webpack" />
        <img src={ReactLogo} width={75} height={65} alt="react" />
      </div>
      <div className="content">
        <Typography style={{ marginBottom: '16rem' }}>
          Boilerplate React Webpack 5
        </Typography>
        <p>
          Webpack 5 boilerplate for react using babel, sass, with a hot dev server and an optimized production build.Configured with eslint rules.
          <small>
            Its posted on
            {' '}
            { new Date().toDateString() }
          </small>
        </p>
        <Button onClick={openButtonLink}>
          Get started it
        </Button>
      </div>
    </div>
  );
}
