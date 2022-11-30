import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <nav className={styles.nav}>
    <Link to="/" className="btn btn--icon">
      <span><FontAwesomeIcon icon={faBookOpen} /></span>
    </Link>
    <Link to="/" className="btn btn--icon">
      <span><FontAwesomeIcon icon={faUserGroup} /></span>
    </Link>
    <Link to="/" className="btn btn--primary">
      <span>Finish Session</span>
    </Link>
  </nav>
)

export default Navigation;
