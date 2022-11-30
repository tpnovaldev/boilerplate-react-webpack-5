import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout, Container } from '../../components';
import styles from './NotFound.module.scss';

import ImageBg from '../../assets/images/background.jpg';

function NotFoundPage() {
  return (
    <AuthLayout>
      <section id="notFound" className="section-page" style={{ backgroundImage: `url(${ImageBg})` }}>
        <Container>
          <div className={styles.notFoundWrapper}>
            <h1>404</h1>
            <p>The page you requested could not found!</p>
            <Link to="/">Back to home</Link>
          </div>
        </Container>
      </section>
    </AuthLayout>
  );
}

export default NotFoundPage;
