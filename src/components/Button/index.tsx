import styles from './styles.module.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  width?: string;
  color?: string;
  backgroundColor?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

export function Button({
  onClick,
  text,
  width,
  color,
  backgroundColor,
  type
}: ButtonProps) {
  return (
    <>
      <button
        className={styles.button}
        onClick={onClick}
        style={{ width: width, color: color, background: backgroundColor }}
        type={type}
      >
        <i>
          <MdKeyboardArrowRight style={{ verticalAlign: 'middle' }} />
        </i>
        {`${text}`}
      </button>
    </>
  );
}
