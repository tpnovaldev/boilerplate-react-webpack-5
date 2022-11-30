import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { AuthProvider } from './hooks/useAuth';
// import store from './store';
import App from './App';
import './styles/main.scss';

const Wrapper = ({ children }) => {
  const location = useLocation();

  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper>
        <AuthProvider>
          {/* <Provider store={store}> */}
          <App />
          {/* </Provider> */}
        </AuthProvider>
      </Wrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
