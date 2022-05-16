import styles from './styles.module.scss';
import Link from 'next/link';
import { AiFillCar } from 'react-icons/ai';

interface LogoProps {
  color?: string;
  width?: number;
  fontSize?: number;
  iconOnly?: boolean;
}

export function Logo({ color, width, fontSize, iconOnly }: LogoProps) {
  return (
    <div className={styles.logoContainer}>
      <Link href="/">
        <a style={{ color: color, fontSize: fontSize }}>
          <i>
            <AiFillCar style={{ verticalAlign: 'middle' }} />
          </i>
          {iconOnly === true ? null : (
            <span style={{ color: color }}> dealership</span>
          )}
        </a>
      </Link>
    </div>
  );
}
