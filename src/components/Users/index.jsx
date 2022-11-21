/* eslint-disable react/prop-types */
import React from 'react';

function Users({ loading, error, data }) {
  // Loading user state
  if (loading) return <p>Loading please wait...</p>;

  // Error user state
  if (error) return <p>Users not available for this time</p>;

  return (
    <ul className="users">
      {data.map((user) => <li>{user.name}</li>)}
    </ul>
  )
}

export default Users;
