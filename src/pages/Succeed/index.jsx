import React from 'react';
import { useSelector } from 'react-redux';
import { BaseLayout, Container } from '../../components';

import styles from './Succeed.module.scss';

import ImageBg from '../../assets/images/background.jpg';

function SucceedPage() {
  const { userToken } = useSelector((state) => state.user);

  return (
    <BaseLayout>
      <section id="succeed" className="section-page" style={{ backgroundImage: `url(${ImageBg})` }}>
        <Container>
          <div className={styles.succeedWrapper}>
            <p>
              Succeed, your token is
              {' '}
              <strong>
                {userToken?.token}
              </strong>
            </p>
          </div>
        </Container>
      </section>
    </BaseLayout>
  )
}

export default SucceedPage;
