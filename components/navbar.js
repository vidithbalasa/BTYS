import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import VinylBackdrop from './vinylBackdrop';
import { motion, AnimatePresence  } from 'framer-motion';
import { useEffect, useState } from 'react';
import useMediaQuery from '../src/hooks/mediaQuery';
import { useRouter } from 'next/router';

export default function Navbar({ children }) {
    const smallScreen = useMediaQuery(975);
    const router = useRouter();
    const iconSize = 30;

    const links = [
        { displayName: "Design", ref: "/design" },
        { displayName: "Create", ref: "/create" },
        {customLink: (
            <Link href='/cart'><a>
                <div className={styles.cart}>
                    <Image
                        src={router.pathname==='/cart' ? '/shopping-cart-white.svg' : '/shopping-cart-b1b1b1.svg'}
                        alt='Shopping Cart' width={iconSize} height={iconSize}  />    
                </div>
            </a></Link>
        )},
        {customLink: (
            <Link href='/profile'><a>
                <img 
                    src={router.pathname==='/profile' ? '/user-circle-white.svg' : '/user-circle-b1b1b1.svg'}
                    alt='User Profile' className={styles.profile} />    
            </a></Link>
        )}
    ]

    return (
        <VinylBackdrop>
            {smallScreen
                ? <ResponsiveNavbar links={links} />
                : <LinkDisplay links={links} boxClass={styles.links} />
            }
            <div className={styles.logo}>
                <Link href='/'><a>
                        <Image src='/Logo.png' alt='Better Than You Society Logo' width={200} height={200} />
                </a></Link>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </VinylBackdrop>
    )
}

function ResponsiveNavbar({ links }) {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const iconSize = 35;

    return (
        <motion.nav initial={false} animate={expanded ? "open" : "closed"} className={styles.responsiveNav}>
            <motion.div variants={{ open: { display: "flex" }, closed: { display: "none" } }} className={styles.responsiveItems}>
            </motion.div>
            <motion.div className={`${styles.barBox} ${!expanded && styles.stationedBarBox} ${expanded && styles.closeBox}`} onClick={() => setExpanded(!expanded)}>
                {/* Horizontal bars that turn into an X when expanded */}
                <motion.div className={styles.bar} variants={{ open: { rotate: 45, y: 5 }, closed: { rotate: 0, y: 0 } }} />
                <motion.div className={styles.bar} variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }} transition={{ duration: 0 }} />
                <motion.div className={styles.bar} variants={{ open: { rotate: -45, y: -5 }, closed: { rotate: 0, y: 0 } }} />
            </motion.div>
            {/* {expanded && <LinkDisplay links={links} boxClass={styles.responsiveLinkBox} />} */}
            {expanded &&
                <div className={styles.responsiveLinkBox}>
                    <Link href='/design'><a>
                        <h4 className={router.pathname==='/design' && styles.active}>Design</h4>
                    </a></Link>
                    <div className={styles.responsiveIcons}>
                        <Link href='/cart'><a>
                            <div className={styles.cart}>
                                <Image src={router.pathname==='/cart' ? '/shopping-cart-white.svg' : '/shopping-cart-b1b1b1.svg'} alt='Shopping Cart' height={iconSize} width={iconSize} />
                            </div>
                        </a></Link>
                        <Link href='/profile'><a>
                            <div className={styles.profile}>
                                <Image src={router.pathname==='/profile' ? '/user-circle-white.svg' : '/user-circle-b1b1b1.svg'} alt='User Profile'  height={iconSize} width={iconSize} />    
                            </div>
                        </a></Link>
                    </div>
                    <Link href='/create'><a>
                        <h4 className={router.pathname==='/create' && styles.active}>Create</h4>    
                    </a></Link>
                </div>
                
            }
        </motion.nav>
    )
}

function LinkDisplay({ links, boxClass }) {
    const router = useRouter();

    return (
        <div className={boxClass}>
            {
                links.map((link, index) => {
                    return (
                        link.customLink
                            ? link.customLink
                            : (
                                <Link href={link.ref} key={index}><a>
                                    <h4 className={router.pathname===link.ref && styles.active}>{link.displayName}</h4>
                                </a></Link>
                            )
                    )
                })
            }
        </div>
    )
}