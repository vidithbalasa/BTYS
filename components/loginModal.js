import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/loginModal.module.css';
import AuthService from '../src/auth/AuthService';
import Image from 'next/image';
import { useEffect } from 'react';
import useAuth from '../src/auth/authContext';
import { useRouter } from 'next/router';

export default function LoginModal({ message='', setShowLogin=()=>{} }) {
    const { user } = useAuth();

    useEffect(() => {
        if (setShowLogin && user) {
            setShowLogin(false);
        }
    }, [user])
    
    return (
        <div>
            {/* {children} */}
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
                        <h1>{message || 'This Feature is Protected'}</h1>
                        <motion.button 
                            onClick={AuthService.login} 
                            className={styles.loginButton}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97, transition: { duration: 0.01 } }}
                        >
                            <Image src="/google-logo.png" alt="Google Logo" width={25} height={25} />
                            <p className={styles.buttonText}>Login / Sign-Up with Google</p>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}