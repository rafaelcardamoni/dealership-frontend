import { Form } from '@unform/web';
import { useContext, useEffect, useRef, useState } from 'react';
import { Input } from '../../components/Form/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Login.module.scss';
import * as Yup from 'yup';
import Head from 'next/head';

interface SignInProps {
  email: string;
  password: string;
  rememberPassword: string;
}

export default function Login() {
  const [selected, setSelected] = useState(false);
  const formRef = useRef(null);
  const { signIn, authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) Router.push('/dashboard');
  }, []);

  async function handleSubmit(data: SignInProps, { reset }) {
    const { email, password, rememberPassword } = data;
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      signIn({ email, password, rememberPassword }, formRef);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  function handleCheckboxValue() {
    setSelected(!selected);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | dealership</title>
      </Head>

      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Logo />
        </div>

        <Form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">E-mail</label>
            <Input name="email" type="email" />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Senha</label>
            <Input name="password" type="password" />
          </div>

          <div className={styles.options}>
            <div className={styles.checkbox}>
              <Input
                name="rememberPassword"
                type="checkbox"
                onChange={handleCheckboxValue}
                value={selected}
              />
              <label htmlFor="rememberPassword" className={styles.label}>
                Lembrar a senha
              </label>
            </div>

            <Link href="/password-reset">
              <a>Esqueci minha senha</a>
            </Link>
          </div>

          <Button
            type="submit"
            text="Entrar"
            padding=".7rem 1rem .7rem .5rem"
            hoverColorClass="textColorFilter"
            icon={' '}
          />
        </Form>
      </div>
    </div>
  );
}
