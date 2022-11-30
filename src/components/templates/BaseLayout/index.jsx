import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../organisms/Header';
import styles from './BaseLayout.module.scss';

const BaseLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      {children}
    </main>
  </div>
)

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;
