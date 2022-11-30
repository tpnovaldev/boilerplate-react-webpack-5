/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, ...rest }) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
)

export default Button;
