/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  AuthLayout,
  Container,
  Brand,
  Button,
} from '../../components';
import { useAuth } from '../../hooks/useAuth';

import styles from './Auth.module.scss';

import ImageBg from '../../assets/images/background.jpg';

// The following component is an example of your existing Input Component
const Input = ({
  label,
  register,
  required,
  placeholder,
  ...rest
}) => (
  <>
    <label className="form__label">{label}</label>
    <input
      className="form__input"
      placeholder={placeholder}
      {...register(label.toLowerCase(), { required })}
      {...rest}
    />
  </>
);

function Auth() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => login(data)

  return (
    <AuthLayout>
      <section id="login" className="section-page" style={{ backgroundImage: `url(${ImageBg})` }}>
        <Container>
          <div className={styles.loginWrap}>
            <Brand />
            <h3>Spin it Now</h3>
            <p>Please log in to start the game!</p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__group">
                <Input
                  label="Email"
                  placeholder="youremail@domain.com"
                  type="email"
                  register={register}
                  required
                />
              </div>
              <div className="form__group">
                <Input
                  label="Password"
                  placeholder="******"
                  type="password"
                  register={register}
                  required
                />
              </div>
              <Button type="submit">
                Log In
              </Button>
            </form>
            <Link to="/" className={styles.registerLink}>Don&rsquo;t have an account? Sign Up</Link>
          </div>
        </Container>
      </section>
    </AuthLayout>
  );
}

export default Auth;
