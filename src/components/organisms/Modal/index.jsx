import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Container from '../../atoms/Container';

import styles from './Modal.module.scss';

function Modal({
  children,
  title,
  subtitle,
}) {
  return (
    <div className={styles.modal}>
      <motion.div
        className={styles.modal__inner}
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.modal__header}>
          <Container>
            <h2 className={styles.modal__title}>
              <span>{subtitle}</span>
              {title}
            </h2>
          </Container>
        </div>
        <div className={styles.modal__content}>
          <Container>
            {children}
          </Container>
        </div>
      </motion.div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default Modal;
