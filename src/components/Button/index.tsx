import { MdKeyboardArrowRight } from 'react-icons/md';
import styles from './styles.module.scss';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  shape?: string;
  icon?: React.ReactNode;
  padding?: string;
  hoverColorClass?: 'red' | 'textColorFilter' | undefined;
}

export function Button({
  onClick,
  text,
  width,
  height,
  color,
  padding,
  backgroundColor,
  type,
  shape,
  icon,
  hoverColorClass
}: ButtonProps) {
  return (
    <>
      <button
        className={
          hoverColorClass
            ? `${styles.button} ${styles[hoverColorClass]}`
            : styles.button
        }
        onClick={onClick}
        style={{
          width: width,
          height: height,
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
