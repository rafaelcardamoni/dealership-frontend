import Link from 'next/link';
import styles from './styles.module.scss';

interface DashboardNavigationItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
  onClick?: () => void;
  disableLink?: true | false;
}

export function DashboardNavigationItem({
  children,
  icon,
  href,
  onClick,
  disableLink
}: DashboardNavigationItemProps) {
  return (
    <Link href={href}>
      <a
        className={styles.menuItem}
        onClick={onClick}
        style={disableLink ? { pointerEvents: 'none' } : null}
      >
        <div>
          <i>{icon}</i>
          {children}
        </div>
      </a>
    </Link>
  );
}
