import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navList}>
                    <li><Link href="/" className={styles.navLink}>Home</Link></li>
                    <li><Link href="/dashboard" className={styles.navLink}>Dashboard</Link></li>
                    <li><Link href="/jobs" className={styles.navLink}>Jobs</Link></li>
                </ul>
            </nav>
            <Link href="/login" className={styles.signIn}>
                Sign in
            </Link>
        </header>
    );
}


