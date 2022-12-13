import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import VinylBackdrop from './vinylBackdrop';
import { motion, AnimatePresence  } from 'framer-motion';
import { useEffect, useState } from 'react';
import useMediaQuery from '../src/hooks/mediaQuery';
import { useRouter } from 'next/router';

export default function Navbar({ children }) {
    const smallScreen = useMediaQuery(1000);

    const links = [
        { displayName: "Design", ref: "/design" },
        { displayName: "Create", ref: "/create" },
        { displayName: "Portfolio", ref: "/portfolio" },
    ]

    return (
        <VinylBackdrop>
            {smallScreen
                ? <ResponsiveNavbar links={links} />
                : <LinkDisplay links={links} boxClass={styles.links} />
            }
            <div className={styles.logo}>
                <Link href='/'>
                    <a>
                        <Image src='/Logo.png' alt='Better Than You Society Logo' width={200} height={200} />
                    </a>
                </Link>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </VinylBackdrop>
    )
}

function ResponsiveNavbar({ links }) {
    // Nav bar that starts as an icon in the top right and expands when clicked
    const [expanded, setExpanded] = useState(false);

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
            {expanded && <LinkDisplay links={links} boxClass={styles.responsiveLinkBox} />}
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
                        // if current endpoint is same as link, add active class
                        <Link href={link.ref} key={index}><a>
                            <h4 className={router.pathname===link.ref && styles.active}>{link.displayName}</h4>
                        </a></Link>
                    )
                })
            }
        </div>
    )
}