import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import axios from 'axios';

interface User {
  email: string;
  password: string;
}

interface AuthContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  signIn({ email, password }: User): Promise<void>;
  redirect(url: string): void;
}

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function redirect(url: string) {
    if (authenticated) {
      Router.push(`${url}`);
    }
  }

  useEffect(() => {
    const { 'nextauth.token': authToken } = parseCookies();

    if (authToken) {
      return console.log('authenticated user');
    } else {
      redirect('/login');
    }
  }, []);

  async function signIn({ email, password }: User) {
    axios
      .post(`https://dealership-next.herokuapp.com/api/login`, {
        email: email,
        password: password
      })
      .then(result => {
        if (result.status === 200) {
          console.log(result.data);
          setToken(result.data);
          setAuthenticated(true);
          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1 // 1 hour to expire
          });
          redirect('/dashboard');
        } else {
          setError(true);
        }
      })
      .catch(error => {
        console.log(error.message);
        setError(true);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        authenticated,
        setAuthenticated,
        signIn,
        redirect
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
