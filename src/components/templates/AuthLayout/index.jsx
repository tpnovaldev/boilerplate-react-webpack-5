import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <main className={styles.main}>
      {children}
    </main>
  </div>
)

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
