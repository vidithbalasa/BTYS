import styles from '../styles/loader.module.css';
import { motion } from 'framer-motion';

const loadingContainerVariants = {
    start: {transition: {staggerChildren: 0.2}},
    end: {transition: {staggerChildren: 0.2}}
}

const loadingCircleVariants = {
    start: {y: '0%'},
    end: {y: '100%'}
}

const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut'
}

const loadingContainer = {
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "space-around"
};

const loadingCircle = {
    display: "block",
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "white",
    borderRadius: "0.25rem"
};

export default function Loader() {  

    return (
        <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial='start'
            animate='end'
        >
            {[0,1,2].map((i) => (
                <motion.div
                    style={loadingCircle}
                    className={styles.loadingCircle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                    key={i}
                />
            ))}
        </motion.div>
    )
}