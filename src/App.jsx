import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from './features/users/userSlice';
import { fetchUsers } from './features/users/userService';
import {
  Button, Logos, Typography, Users,
} from './components';

export default function App() {
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from our store
  const { loading, error, users } = useSelector(usersSelector);

  // hook to fetch items
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="main">
      <Logos />
      <div className="content">
        <Typography style={{ marginBottom: '16rem' }}>Boilerplate React Webpack 5</Typography>
        <p>
          Webpack 5 boilerplate for react using babel, sass, with a hot dev server and an optimized production
          build.Configured with eslint rules.
          <small>
            Its posted on
            {new Date().toDateString()}
          </small>
        </p>
        <Button onClick={() => openInNewTab('https://github.com/tpnovaldev/boilerplate-react-webpack-5')}>
          Get started it
        </Button>
        <h6>Peoples who colaborate</h6>
        <Users loading={loading} error={error} data={users} />
      </div>
    </div>
  );
}
