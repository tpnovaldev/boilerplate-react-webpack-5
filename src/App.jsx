import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Landing from './pages/Landing';
import Succeed from './pages/Succeed';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      mode="wait"
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Navigate to="/start-your-game" />} />
          <Route path="/start-your-game" element={<Landing />} />
          <Route path="/succeed" element={<Succeed />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
