import styles from './styles.module.scss';
import { BiMap } from 'react-icons/bi';
import { MenuSeparator } from '../MenuSeparator';

interface SeparatorProps {
  separator?: boolean;
}

export function FindUs({ separator }: SeparatorProps) {
  return (
    <div className={styles.container}>
      {separator ? <MenuSeparator /> : ''}
      <a href="https://www.google.com/maps/dir//manocar/@-23.5234253,-46.6571677,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x94cef7baf458c3c5:0xd3010fafce25a1fb!2m2!1d-46.6118346!2d-23.4967696">
        <BiMap size={23} style={{ verticalAlign: 'bottom' }} />
        <span>Localização</span>
      </a>
    </div>
  );
}
