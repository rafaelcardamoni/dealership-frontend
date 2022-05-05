import styles from './styles.module.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface ButtonProps {
  func?(): void;
  text: string;
}

export function Button({ func, text }: ButtonProps) {
  return (
    <>
      <button className={styles.button} onClick={func}>
        <i>
          <MdKeyboardArrowRight style={{ verticalAlign: 'middle' }} />
        </i>
        {`${text}`}
      </button>
    </>
  );
}
