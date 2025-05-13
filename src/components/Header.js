/* eslint-disable @next/next/no-img-element */
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="Telecom Logo" className={styles.logoImage} />
        
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/doctor-registrations" className={styles.navLink}>Doctor Registrations</Link>
        <Link href="/certificate-generation" className={styles.ctaButton}>
          CERTIFICATE GENERATION
        </Link>
      </nav>
    </header>
  );
};

export default Header;
