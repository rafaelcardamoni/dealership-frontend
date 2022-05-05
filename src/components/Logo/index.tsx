import styles from './styles.module.scss';
import Link from 'next/link';
import { AiFillCar } from 'react-icons/ai';

interface LogoProps {
  color?: string;
  width?: number;
  fontSize?: number;
}

export function Logo({ color, width, fontSize }: LogoProps) {
  return (
    <div className={styles.logoContainer}>
      <Link href="/">
        <a style={{ color: color, fontSize: fontSize }}>
          <i>
            <AiFillCar style={{ verticalAlign: 'middle' }} />
          </i>
          <span style={{ color: color }}> dealership</span>
        </a>
      </Link>
    </div>
  );
}
