import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../hooks/useAuth';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav className={styles.nav}>
      {!user && (
        <Link to="/login" className="btn btn--primary">
          <span>Log In</span>
        </Link>
      )}
      {!!user && (
        <>
          <Link to="/" className="btn btn--icon">
            <span><FontAwesomeIcon icon={faBookOpen} /></span>
          </Link>
          <Link to="/" className="btn btn--icon">
            <span><FontAwesomeIcon icon={faUserGroup} /></span>
          </Link>
          <Link to="/" className="btn btn--primary">
            <span>Finish Session</span>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
