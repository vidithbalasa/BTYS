import styles from '../styles/expandableButton.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ExpandableButton({ icon, text, onClick, iconSize, style }) {

    return (
        <motion.button 
            className={`${styles.circle} ${style}`}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{ '--text': `"${text}"`, '--iconSize': `${iconSize}px` }}           
        >
            <div className={styles.icon}>
                <Image src={icon} alt={text} width={iconSize} height={iconSize} />
            </div>
        </motion.button>
    )
}