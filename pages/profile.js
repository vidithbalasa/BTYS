import { motion } from "framer-motion";
import styles from '../styles/profile.module.css';
import { withProtected } from '../src/auth/route';


function Profile() {

    return (
        <>
            <motion.button
                className={styles.deleteButton}
                whileHover={{ boxShadow: '0 0 0 0.5rem rgba(255, 0, 0, 0.5)' }}
            >
                Delete Account
            </motion.button>
            <p className={styles.warning}>This Action is Permanent</p>
        </>
    )
}

export default withProtected(Profile);