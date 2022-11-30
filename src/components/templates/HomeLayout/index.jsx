/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/succeed" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};
