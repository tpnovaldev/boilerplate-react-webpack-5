/* eslint-disable react/prop-types */
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  AuthLayout,
  Container,
  Brand,
  Button,
} from '../../components';
import { userLogin } from '../../features/user/userActions';

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

function AuthPage() {
  const { userToken, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  // redirect authenticated user to succeed page
  React.useEffect(() => {
    if (userToken) {
      navigate('/succeed');
    }
  }, [navigate, userToken]);

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };
  // console.log(errors);

  return (
    <AuthLayout>
      <section id="login" className="section-page" style={{ backgroundImage: `url(${ImageBg})` }}>
        <Container>
          <div className={styles.loginWrap}>
            <Brand />
            <h3>Its your turn</h3>
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
              <Button type="submit" disabled={loading}>
                Login Now
              </Button>
              {error && <small className="block mt-3 text-center text-sm text-red-700">{error}</small>}
            </form>
            <Link to="/" className={styles.registerLink}>Don&rsquo;t have an account? Sign Up</Link>
          </div>
        </Container>
      </section>
    </AuthLayout>
  );
}

export default AuthPage;
