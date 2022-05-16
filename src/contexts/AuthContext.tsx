import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';

interface User {
  fullname?: string;
  email: string;
  password?: string;
}

interface AuthContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  signIn({ email, password }: User): Promise<void>;
}

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const { 'nextauth.token': authToken } = parseCookies();

    if (authToken) {
      setAuthenticated(true);
    }
  }, []);

  async function signIn({ email, password }: User) {
    api
      .post('/api/login', {
        email: email,
        password: password
      })
      .then(result => {
        if (result.status === 200) {
          const { token } = result.data;
          const { name, email } = result.data;
          const userInfo = {
            fullname: name,
            email: email
          };
          setToken(token);
          setAuthenticated(true);
          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1 // 1 hour to expire
          });
          setCookie(undefined, 'userInfo', JSON.stringify(userInfo), {
            maxAge: 60 * 60 * 1 // 1 hour to expire
          });

          Router.push('/dashboard');
        } else {
          setError(true);
        }
      })
      .catch(e => {
        if (e.response) {
          setError(true);
          setErrorMessage(e.response.data.error);
        }
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
        errorMessage,
        setErrorMessage,
        authenticated,
        setAuthenticated,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
