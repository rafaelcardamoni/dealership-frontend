import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { DashboardAllVehicles } from '../../components/DashboardAllVehicles';
import { AiOutlineReload } from 'react-icons/ai';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import styles from '../../styles/Dashboard.module.scss';
import { DashboardAddVehicle } from '../../components/DashboardAddVehicle';

interface User {
  fullname: string;
  email: string;
}

export default function Dashboard({ userInfo }) {
  const [selected, setSelected] = useState('allVehicles');
  const router = useRouter();
  const user: User = userInfo;

  return (
    <div className={styles.container}>
      <section className={styles.sidebar}>
        <DashboardSidebar user={user} setSelected={setSelected} />
      </section>
      <section className={styles.contentContainer}>
        <div className={styles.header}>
          {selected === 'allVehicles' ? <h1>Todos os veículos</h1> : null}
          {selected === 'addVehicle' ? <h1>Adicionar novo carro</h1> : null}
          {selected === 'allUsers' ? <h1>Todos os usuários</h1> : null}
          {selected === 'addUser' ? <h1>Cadastrar novo usuário</h1> : null}
          <button
            className={styles.reload}
            onClick={() => {
              router.reload();
            }}
          >
            <i>
              <AiOutlineReload />
            </i>
            <span>Atualizar</span>
          </button>
        </div>
        <div className={styles.content}>
          {selected === 'allVehicles' ? <DashboardAllVehicles /> : null}
          {selected === 'addVehicle' ? <DashboardAddVehicle /> : null}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: authToken, ['userInfo']: encoded } =
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

  const bytes = CryptoJS.AES.decrypt(encoded, process.env.NEXT_PUBLIC_ENC);
  const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return {
    props: { userInfo } || {}
  };
};
