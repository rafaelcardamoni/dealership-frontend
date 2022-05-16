import jwt from 'jsonwebtoken';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { clientSideApi } from '../../services/clientSideApi';

export default function Dashboard({ userInfo }) {
  const user = JSON.parse(userInfo);

  useEffect(() => {
    clientSideApi.get('/api/users');
  }, []);

  return (
    <>
      <h1>{`Hello ${user.fullname}!`}</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: authToken, ['userInfo']: userInfo } =
    parseCookies(ctx);

  let isValid: boolean;

  jwt.verify(authToken, process.env.SECRET_KEY, err => {
    if (err) {
      if (err.name == 'TokenExpiredError') {
        console.log('Expired token');
        return (isValid = false);
      } else {
        console.log(
          `Error: ${err.name}, Message: ${err.message}, Cause: ${err.cause}`
        );
        return (isValid = false);
      }
    } else {
      return (isValid = true);
    }
  });

  if (!isValid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: { userInfo }
  };
};
