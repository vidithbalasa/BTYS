import { motion } from "framer-motion";
import styles from '../styles/toggle.module.css';

export default function Toggle({ state1Name, state2Name, setState, state }) {
    
    // Create a toggle with framer-motion to animate the toggle
    // Toggle between true and false
    const toggleVariants = {
        true: {
            backgroundColor: "#00FF00",
            x: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
        false: {
            backgroundColor: "#FF0000",
            x: 30,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    }

    return (
        <div className={styles.toggleBox}>
            <motion.button
                onClick={() => setState(!state)}
                animate={{ 
                    backgroundColor: state ? "#D9D9D9" : "#767676",
                    color: state ? "black" : "#505050"
                }}
                className={`${styles.toggle} ${styles.leftToggle}`}
            >
                <div className={styles.toggleContainer}>
                    {state1Name}
                </div>
            </motion.button>
            <motion.button
                onClick={() => setState(!state)}
                animate={{ 
                    backgroundColor: !state ? "#D9D9D9" : "#767676",
                    color: !state ? "black" : "#505050"
                }}
                className={`${styles.toggle} ${styles.rightToggle}`}
            >
                <div className={styles.toggleContainer}>
                    {state2Name}
                </div>
            </motion.button>
        </div>
    )
}