import styles from './styles.module.scss';

interface DashboardNavigationProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardNavigation({
  children,
  title,
  subtitle
}: DashboardNavigationProps) {
  return (
    <div className={styles.navigationContainer}>
      <div className={styles.headerWrapper}>
        <h4>{title.toUpperCase()}</h4>
        <span>{subtitle}</span>
      </div>
      {children}
    </div>
  );
}
