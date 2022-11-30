import React from 'react';
import Brand from '../../atoms/Brand';
import Navigation from '../../molecules/Navigation';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <Brand />
      <Navigation />
    </div>
  </header>
)

export default Header;
