import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { clientSideApi } from '../services/clientSideApi';
import Router from 'next/router';
import CryptoJS from 'crypto-js';

interface User {
  fullname?: string;
  email: string;
  password?: string;
  rememberPassword?: string;
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
  signIn({ email, password }: User, formRef?): Promise<void>;
  handleLogout(): void;
}

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogout() {
    destroyCookie({}, 'nextauth.token');
    destroyCookie({}, 'userInfo');
  }

  useEffect(() => {
    const { 'nextauth.token': authToken } = parseCookies();

    if (authToken) {
      setAuthenticated(true);
    }
  }, []);

  async function signIn({ email, password, rememberPassword }: User, formRef) {
    clientSideApi
      .post('/api/login', {
        email: email,
        password: password
      })
      .then(result => {
        if (result.status === 200) {
          formRef.current.reset();
          const { token } = result.data;
          const { name, email } = result.data;
          const user = {
            fullname: name,
            email: email
          };

          const encoded = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            process.env.NEXT_PUBLIC_ENC
          ).toString();

          setToken(token);
          setAuthenticated(true);

          if (rememberPassword === 'true') {
            setCookie(undefined, 'nextauth.token', token, {
              maxAge: 315360000 // does not expire
            });
            setCookie(undefined, 'userInfo', encoded, {
              maxAge: 315360000 // does not expire
            });
          } else {
            setCookie(undefined, 'nextauth.token', token, {
              maxAge: 60 * 60 * 1 // 1 hour to expire
            });
            setCookie(undefined, 'userInfo', encoded, {
              maxAge: 60 * 60 * 1 // 1 hour to expire
            });
          }

          Router.push('/dashboard');
        } else {
          setError(true);
        }
      })
      .catch(e => {
        if (e.response) {
          setError(true);
          setErrorMessage(e.response.data.error);
          formRef.current.reset();

          const errorMessages = {
            email: '',
            password: 'E-mail ou senha incorreta'
          };

          formRef.current.setErrors(errorMessages);
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
        signIn,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
