import { MenuSeparator } from '../components/MenuSeparator';
import styles from '../styles/404.module.scss';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h2>404</h2>
      <MenuSeparator />
      <span>This page could not be found</span>
    </div>
  );
}
