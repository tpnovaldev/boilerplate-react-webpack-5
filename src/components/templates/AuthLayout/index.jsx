import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './AuthLayout.module.scss';

const AuthLayout = ({ children }) => (
  <motion.div
    className={styles.wrapper}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <main className={styles.main}>
      {children}
    </main>
  </motion.div>
)

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
