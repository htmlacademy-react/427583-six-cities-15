import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppRoute } from '@/common/const';
import { TCityName, TUserAuthData } from '@/common/types';
import { getRandomCityName, validatePassword } from '@/common/utils';
import Logo from '@/components/logo';
import useAppDispatch from '@/hooks/use-app-dispatch';
import { login } from '@/store/auth/thunks';
import { setCity } from '@/store/global/slice';


const Login = () => {
  const dispatch = useAppDispatch();
  const randomCity = useRef<TCityName>(getRandomCityName());

  const [loginForm, setLoginForm] = useState<TUserAuthData>({
    email: '',
    password: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(loginForm.password)) {
      return toast.warn('Пароль должен состоять минимум из одной буквы и цифры');
    }

    dispatch(login(loginForm));
  };

  const handleRandomCityClick = () => {
    dispatch(setCity(randomCity.current));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleFieldChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleFieldChange}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleRandomCityClick}
              >
                <span>{randomCity.current}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
