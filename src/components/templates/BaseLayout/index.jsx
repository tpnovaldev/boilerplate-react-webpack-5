import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Header from '../../organisms/Header';
import styles from './BaseLayout.module.scss';

const BaseLayout = ({ children }) => (
  <motion.div
    className={styles.wrapper}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Header />
    <main className={styles.main}>
      {children}
    </main>
  </motion.div>
)

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
