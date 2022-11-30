import React from 'react';
import PropTypes from 'prop-types';
import styles from './Users.module.scss';

const Users = ({ loading, error, data }) => {
  // Loading user state
  if (loading) return <p>Loading please wait...</p>;

  // Error user state
  if (error) return <p>Users not available for this time</p>;

  return (
    <ul className={styles.users}>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default Users;
