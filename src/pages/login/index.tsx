import { Form } from '@unform/web';
import { useContext, useEffect } from 'react';
import { Input } from '../../components/Form/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Login.module.scss';

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const { signIn, authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) Router.push('/dashboard');
  }, []);

  function handleSubmit({ email, password }: User) {
    signIn({ email, password });
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Logo />
        </div>

        <Form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">E-mail</label>
            <Input name="email" type="email" required />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Senha</label>
            <Input name="password" type="password" required />
          </div>

          <div className={styles.options}>
            <div className={styles.checkbox}>
              <Input name="rememberPassword" type="checkbox" />
              <label htmlFor="rememberPassword" className={styles.label}>
                Lembrar a senha
              </label>
            </div>

            <Link href="/password-reset">
              <a>Esqueci minha senha</a>
            </Link>
          </div>

          <Button type="submit" text="Entrar" />
        </Form>
      </div>
    </div>
  );
}
