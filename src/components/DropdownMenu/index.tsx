import styles from './styles.module.scss';

interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <div className={styles.dropdown}>{children}</div>;
}
