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
                        <Link href='/catalog'><h4>Catalog</h4></Link>
                        <Link href='/design'><h4>Design</h4></Link>
                        <Link href='/create'><h4>Create</h4></Link>
                        <Link href='/portfolio'><h4>Portfolio</h4></Link>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}