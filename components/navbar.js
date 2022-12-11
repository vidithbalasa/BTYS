import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.bar}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    {/* next js image component w src from public/Logo.png.webp */}
                    <Image src='/Logo.png.webp' alt='Better Than You Society Logo' width={100} height={100} />
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
    )
}