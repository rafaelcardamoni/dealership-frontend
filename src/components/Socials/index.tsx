import Link from 'next/link';
import styles from './styles.module.scss';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export function Socials() {
  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <i className={styles.facebook}>
          <FaFacebook />
        </i>
      </Link>
      <Link href="/" passHref>
        <i className={styles.instagram}>
          <FaInstagram />
        </i>
      </Link>
      <Link href="/" passHref>
        <i className={styles.twitter}>
          <FaTwitter />
        </i>
      </Link>
      <Link href="/" passHref>
        <i className={styles.youtube}>
          <FaYoutube />
        </i>
      </Link>
    </div>
  );
}
