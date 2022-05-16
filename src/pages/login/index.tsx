import { Form } from '@unform/web';
import { useContext, useEffect } from 'react';
import { Input } from '../../components/Form/Input';
import { AuthContext } from '../../contexts/AuthContext';
import Router from 'next/router';

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const { signIn, authenticated } = useContext(AuthContext);

  function handleSubmit({ email, password }: User) {
    signIn({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="E-mail" required />
      <Input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </Form>
  );
}
