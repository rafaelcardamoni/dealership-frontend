import styles from './styles.module.scss';
import { BiMap } from 'react-icons/bi';
import { MenuSeparatorVertical } from '../MenuSeparatorVertical';

interface SeparatorProps {
  separator?: boolean;
}

export function FindUs({ separator }: SeparatorProps) {
  return (
    <div className={styles.container}>
      {separator ? <MenuSeparatorVertical /> : ''}
      <a href="https://www.google.com/maps/">
        <BiMap size={23} style={{ verticalAlign: 'bottom' }} />
        <span>Localização</span>
      </a>
    </div>
  );
}
