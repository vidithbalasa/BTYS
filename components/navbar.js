import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import VinylBackdrop from './vinylBackdrop';

export default function Navbar({ children }) {
    return (
        <VinylBackdrop>
            <div className={styles.bar}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link href='/'>
                            <a>
                                <Image src='/Logo.png' alt='Better Than You Society Logo' width={100} height={100} />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.links}>
                        <Link href='/catalog'><a><h4>Catalog</h4></a></Link>
                        <Link href='/design'><a><h4>Design</h4></a></Link>
                        <Link href='/create'><a><h4>Create</h4></a></Link>
                        <Link href='/portfolio'><a><h4>Portfolio</h4></a></Link>
                    </div>
                </div>
            </div>
            {children}
        </VinylBackdrop>
    )
}