import Link from 'next/link';
import styles from './styles.module.scss';

interface DropdownItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
  onClick?: () => void;
  disableLink?: true | false;
}

export function DropdownItem({
  children,
  icon,
  href,
  onClick,
  disableLink
}: DropdownItemProps) {
  return (
    <Link href={href}>
      <a
        className={styles.menuItem}
        onClick={onClick}
        style={disableLink ? { pointerEvents: 'none' } : null}
      >
        <span className={styles.icon}>{icon}</span>
        {children}
      </a>
    </Link>
  );
}
