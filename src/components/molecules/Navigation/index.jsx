import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../../features/user/userSlice';

import styles from './Navigation.module.scss';

const Navigation = () => {
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => state.user);

  return (
    <nav className={styles.nav}>
      {!userToken ? (
        <Link to="/login" className="btn btn--primary">
          <span>Lets Play</span>
        </Link>
      ) : null}
      {userToken ? (
        <>
          <Link to="/" className="btn btn--icon">
            <span><FontAwesomeIcon icon={faBookOpen} /></span>
          </Link>
          <Link to="/" className="btn btn--icon">
            <span><FontAwesomeIcon icon={faUserGroup} /></span>
          </Link>
          <Link to="/" onClick={() => dispatch(logout())} className="btn btn--primary">
            <span>Finish Session</span>
          </Link>
        </>
      ) : null}
    </nav>
  );
}

export default Navigation;
