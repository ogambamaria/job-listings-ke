import Link from 'next/link';
import Navbar from '../components/NavBar'; // Import the updated Navbar
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            {/* Navbar component */}
            <Navbar />

            {/* Left Section */}
            <div className={styles.leftSection}>
                <h1 className={styles.title}>
                    Welcome to AjiraNet, where opportunities meet talent
                </h1>
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>
                <p className={styles.description}>
                    We connect you with thousands of job opportunities from top companies across the globe.
                </p>
                <div className={styles.buttons}>
                    <button className={styles.buttonPrimary}>
                        Get started <span className={styles.arrow}>&#8594;</span>
                    </button>
                    <Link href="/how-it-works">
                        <button className={styles.buttonSecondary}>
                            How it works?
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
