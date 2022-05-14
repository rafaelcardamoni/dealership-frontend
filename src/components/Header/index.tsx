import { FindUs } from '../FindUs';
import { Logo } from '../Logo';
import { BiMenuAltRight } from 'react-icons/bi';
import { VscClose } from 'react-icons/vsc';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useState } from 'react';

export function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <div>
              <Logo width={100} fontSize={25} />
            </div>
          </Link>
        </div>
        <div className={styles.menuIcons}>
          <i onClick={handleClick}>
            {click ? <VscClose /> : <BiMenuAltRight />}
          </i>
        </div>
      </div>

      <ul className={click ? styles.mobileMenuActive : styles.mobileMenu}>
        <li className={styles.menuItem}>
          <Link href="/" passHref>
            <a className={styles.menuLinks} onClick={closeMobileMenu}>
              Home
            </a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/inventory" passHref>
            <a className={styles.menuLinks} onClick={closeMobileMenu}>
              Estoque
            </a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/contact-us" passHref>
            <a className={styles.menuLinks} onClick={closeMobileMenu}>
              Contato
            </a>
          </Link>
        </li>
      </ul>
      <div className={styles.location}>
        <FindUs separator={true} />
      </div>
    </nav>
  );
}
