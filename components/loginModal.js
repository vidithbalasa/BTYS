import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/loginModal.module.css';
import AuthService from '../src/auth/AuthService';
import Image from 'next/image';

export default function LoginModal({ children }) {
    
    return (
        <div>
            {children}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.modalBackground}
                >
                    <motion.div
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100vh" }}
                    className={styles.modal}
                    >
                        <h1>Login / Sign Up</h1>
                        <button onClick={AuthService.login} className={styles.loginButton}>
                            <Image src="/google-logo.png" alt="Google Logo" width={18} height={18} />
                            Login with Google
                        </button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}