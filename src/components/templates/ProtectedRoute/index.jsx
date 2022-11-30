/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import AuthLayout from '../AuthLayout';

export const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.user);

  if (!userToken) {
    return (
      <AuthLayout>
        <div className="w-full flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-5xl text-secondary mb-2">Unauthorized :(</h2>
          <span className="block text-lg">
            <Link to="/login" className="text-lg">
              Login
            </Link>
            {' '}
            to gain access
          </span>
        </div>
      </AuthLayout>
    );
  }

  return <Outlet />;
};
