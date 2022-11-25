/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './typography.module.scss';

function Typography({ children, ...props }) {
  return <h1 className={styles.h1} {...props}>{children}</h1>;
}

Typography.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Typography;
