import { MdKeyboardArrowRight } from 'react-icons/md';
import styles from './styles.module.scss';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  width?: string;
  color?: string;
  backgroundColor?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  shape?: string;
  icon?: React.ReactNode;
  padding?: string;
}

export function Button({
  onClick,
  text,
  width,
  color,
  padding,
  backgroundColor,
  type,
  shape,
  icon
}: ButtonProps) {
  return (
    <>
      <button
        className={styles.button}
        onClick={onClick}
        style={{
          width: width,
          color: color,
          background: backgroundColor,
          borderRadius: shape,
          padding: padding
        }}
        type={type}
      >
        <i>{icon ? icon : <MdKeyboardArrowRight />}</i>
        {`${text}`}
      </button>
    </>
  );
}
