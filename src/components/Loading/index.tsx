import { useRouter } from 'next/router';
import React from 'react';
import styles from './styles.module.scss';

export function Loading() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <div className={styles.spinnerContainer}>
      {pageLoading ? (
        <div className={styles.spinner}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : null}
    </div>
  );
}
