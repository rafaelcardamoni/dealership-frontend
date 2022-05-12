import styles from './styles.module.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface ButtonProps {
  func?(): void;
  text: string;
  width?: string;
  color?: string;
  backgroundColor?: string;
}

export function Button({
  func,
  text,
  width,
  color,
  backgroundColor
}: ButtonProps) {
  return (
    <>
      <button
        className={styles.button}
        onClick={func}
        style={{ width: width, color: color, background: backgroundColor }}
      >
        <i>
          <MdKeyboardArrowRight style={{ verticalAlign: 'middle' }} />
        </i>
        {`${text}`}
      </button>
    </>
  );
}
