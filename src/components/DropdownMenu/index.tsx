import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface DropdownMenuProps {
  children: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export function DropdownMenu({ children, open, setOpen }: DropdownMenuProps) {
  const ref = useRef<any>();

  useEffect(() => {
    function handleClickOutsideDropdown(e) {
      if (ref?.current?.contains(e.target)) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [open]);

  return (
    <div ref={ref} className={styles.dropdown}>
      {children}
    </div>
  );
}
