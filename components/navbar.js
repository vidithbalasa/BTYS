import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

export default function Navbar({ children }) {
    return (
        <>
            <div className={styles.bar}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link href='/'>
                            <a>
                                <Image src='/Logo.png.webp' alt='Better Than You Society Logo' width={100} height={100} />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.links}>
                        <Link href='/catalog'>Catalog</Link>
                        <Link href='/design'>Design</Link>
                        <Link href='/create'>Create</Link>
                        <Link href='/portfolio'>Portfolio</Link>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}