import styles from './styles.module.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  width?: string;
  color?: string;
  backgroundColor?: string;
}

export function Button({
  onClick,
  text,
  width,
  color,
  backgroundColor
}: ButtonProps) {
  return (
    <>
      <button
        className={styles.button}
        onClick={onClick}
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
