import Link from 'next/link';
import { Home } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.errorCode}>
          <span className="gradient-text">404</span>
        </div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary" id="not-found-home">
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
