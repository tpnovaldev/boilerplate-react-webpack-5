import React from 'react';
import styles from './Brand.module.scss';
import Logo from '../../../assets/images/logo.svg';

function Brand() {
  return (
    <div className={styles.brand}>
      <img src={Logo} alt="team connector" />
    </div>
  );
}

export default Brand;
