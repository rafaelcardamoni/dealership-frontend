import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { CSSTransition } from 'react-transition-group';
import { Logo } from '../../components/Logo';
import { DropdownMenu } from '../../components/DropdownMenu';
import { DropdownItem } from '../../components/DropdownItem';
import { DashboardNavigation } from '../../components/DashboardNavigation';
import { DashboardNavigationItem } from '../../components/DashboardNavigationItem';
import { IoMdSettings } from 'react-icons/io';
import { BiLogOut, BiUserCircle } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdManageSearch } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { RiUserSearchLine } from 'react-icons/ri';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import styles from '../../styles/Dashboard.module.scss';

interface User {
  fullname: string;
  email: string;
}

export default function Dashboard({ userInfo }) {
  // const user: User = JSON.parse(userInfo);
  const user: User = userInfo;
  const [open, setOpen] = useState(false);

  function handleLogout() {
    destroyCookie({}, 'nextauth.token');
  }

  return (
    <div className={styles.container}>
      <section className={styles.sidebar}>
        <div className={styles.top}>
          <Logo color="white" iconOnly={true} />

          <div className={styles.settings}>
            <button onClick={() => setOpen(!open)} className="ripple">
              <IoMdSettings />
            </button>
            <CSSTransition
              in={open}
              timeout={600}
              classNames={{
                enter: styles['fade-enter'],
                enterActive: styles['fade-enter-active'],
                exit: styles['fade-exit'],
                exitActive: styles['fade-exit-active']
              }}
              unmountOnExit
            >
              <DropdownMenu open={open} setOpen={setOpen}>
                <DropdownItem
                  href=""
                  icon={
                    <BiUserCircle
                      style={{ verticalAlign: 'middle', fontSize: '1.3rem' }}
                    />
                  }
                >
                  Perfil
                </DropdownItem>

                <DropdownItem
                  href=""
                  icon={
                    <BiLogOut
                      style={{ verticalAlign: 'middle', fontSize: '1.3rem' }}
                    />
                  }
                  onClick={handleLogout}
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </CSSTransition>
          </div>
        </div>

        <div className={styles.userInfo}>
          <span>{user.fullname}</span>
          <p>{user.email}</p>
        </div>

        <div className={styles.navigation}>
          <DashboardNavigation
            title="Dashboard"
            subtitle="Gerenciamento de veículos"
          >
            <DashboardNavigationItem
              href="/dashboard"
              icon={<MdManageSearch />}
            >
              Visão geral
            </DashboardNavigationItem>
            <DashboardNavigationItem
              href="/dashboard"
              icon={<IoMdAddCircleOutline />}
            >
              Adicionar veículo
            </DashboardNavigationItem>
          </DashboardNavigation>

          <DashboardNavigation
            title="Usuários"
            subtitle="Gerenciamento de usuários"
          >
            <DashboardNavigationItem
              href="/dashboard"
              icon={<RiUserSearchLine />}
            >
              Lista de usuários
            </DashboardNavigationItem>

            <DashboardNavigationItem
              href="/dashboard"
              icon={<AiOutlineUserAdd />}
            >
              Adicionar usuário
            </DashboardNavigationItem>
          </DashboardNavigation>
        </div>
      </section>

      <section className={styles.content}></section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: authToken, ['userInfo']: encoded } =
    parseCookies(ctx);

  const bytes = CryptoJS.AES.decrypt(encoded, 'secret key 123');
  const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

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
