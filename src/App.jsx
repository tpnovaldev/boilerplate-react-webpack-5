import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Routes,
  Route,
  // useLocation,
} from 'react-router-dom';

import AuthPage from './pages/Auth';
import LandingPage from './pages/Landing';
import SucceedPage from './pages/Succeed';

import { HomeLayout } from './components/templates/HomeLayout';
import { ProtectedLayout } from './components/templates/ProtectedLayout';

function App() {
  // const location = useLocation();

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
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedLayout />}>
            <Route path="succeed" element={<SucceedPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
