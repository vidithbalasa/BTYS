import { motion } from "framer-motion";
import styles from '../styles/profile.module.css';
import { withProtected } from '../src/auth/route';


function Profile() {

    return (
        <>
            <button
                className={styles.deleteButton}
                // whileHover={{ scale: 1.2 }}
                // whileTap={{ scale: 0.9 }}
            >
                Delete Account
            </button>
            <p className={styles.warning}>This Action is Permanent !</p>
        </>
    )
}

export default withProtected(Profile);