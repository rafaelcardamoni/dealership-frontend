import { useRouter } from 'next/router';
import { Logo } from '../Logo';
import { Socials } from '../Socials';
import { MdOutlineEmail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { BiMap } from 'react-icons/bi';
import Link from 'next/link';
import styles from './styles.module.scss';

export function Footer() {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <>
      {router.asPath === '/dashboard' || router.asPath === '/login' ? null : (
        <div className={styles.footerContainer}>
          <div className={styles.grid}>
            <div className={styles.gridItemOne}>
              <ul>
                <li>
                  <Link href="/">
                    <a>Empresa</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Política de Privacidade</a>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <a>Área Interna</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.gridItemTwo}>
              <Socials />
            </div>

            <div className={styles.gridItemThree}>
              <ul>
                <li>
                  <MdOutlineEmail style={{ verticalAlign: 'middle' }} />{' '}
                  <span>car@dealership.com.br</span>
                </li>
                <li>
                  <BsTelephone style={{ verticalAlign: 'middle' }} />{' '}
                  <span>(11) 1234-5678</span>
                </li>
                <li>
                  <BiMap style={{ verticalAlign: 'middle' }} />{' '}
                  <span>Av. John Doe, 123</span>
                </li>
              </ul>
            </div>

            <div className={styles.gridItemBottom}>
              <Logo color="#fff" />
              <span>© {year}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
