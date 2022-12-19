import React, { useState, useContext } from 'react';
// import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';
import useAuth from '../src/auth/authContext';
import Image from 'next/image';
import styles from '../styles/design.module.css';
import globalStyles from '../styles/global.module.css';
import { useRouter } from 'next/router';
import { getFirestore } from 'firebase/firestore';
import Loader from '../components/loader';
import { motion } from 'framer-motion';
import ExpandableButton from '../components/expandableButton';
import createSession from '../src/utils/checkout';
import LoginModal from '../components/loginModal';

function Design() {
    const router = useRouter();
    const { prompt: queryPrompt } = router.query;
    const [prompt, setPrompt] = useState(queryPrompt || '');
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageObject, setImageObject] = useState({line_items: [], additionalData: {}});
    const [checkoutLoad, setCheckoutLoad] = useState(false);
    const [loginRequired, setLoginRequired] = useState(false);
    const functions = getFunctions(getApp());
    const { user } = useAuth();
    const firestore = getFirestore();
    const image_size = 384;
    const iconSize = 30;

    // const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'

    // Call the function to get model prediction
    const callFunction = async () => {
        if (!user) {
            setLoginRequired(true);
            return;
        }
        setLoading(true);
        setImg('');

        const stableaiCall = httpsCallable(functions, 'stableai-function')
        await stableaiCall({ prompt: prompt, token: user.accessToken })
            .then((result) => {
                const img_url = result.data;
                setImg(img_url);
                setImageObject(() => {return {
                    line_items: [{
                        price_data: {
                            currency: 'usd', unit_amount: 800,
                            product_data: { name: prompt, images: [img_url] },
                        },
                        quantity: 1,
                    }],
                    additionalData: { metadata: { 'uid': user.uid, '0_name': prompt, '0_image': img } }
                }})
            })
            .catch((error) => {
                console.log(error);
            });

        setPrompt('');
        setLoading(false);
    }

    return (
        <>
            <main className={`${globalStyles.main} ${globalStyles.mainAuth}`}>
                <div className={styles.promptBox}>
                    <input
                        type='text'
                        name='prompt'
                        id='prompt'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className={styles.promptInput}
                        placeholder='Enter a Prompt Here'
                        />
                    {prompt && <motion.button 
                        onClick={callFunction}
                        disabled={loading || prompt === ''}
                        className={styles.promptButton}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.01 } }}
                    >
                        {loading 
                            ? <div className={styles.loader}><Loader /></div> 
                            :'Generate an Image'
                        }
                    </motion.button>}
                    {loading && <div className={styles.note}>Generating an image takes up to 30 seconds</div>}
                </div>
                {img && (
                    <>
                        <div className={styles.imageBox}>
                            <Image src={img} alt='Generated Image' className={styles.image} height={image_size} width={image_size} />
                        </div>
                        <>
                            <motion.button className={`${styles.circle} ${styles.topCircle}`} whileTap={{ scale: 0.9 }}>
                                <div className={styles.icon}>
                                    <Image src='/shopping-cart-black.svg' alt='Shopping Cart' width={iconSize} height={iconSize} />
                                </div>
                            </motion.button>
                            <ExpandableButton 
                                icon={'/credit-card.svg'} iconSize={iconSize} 
                                onClick={() => {
                                    setCheckoutLoad(true);
                                    createSession(
                                        firestore, user, 
                                        imageObject.line_items, imageObject.additionalData,
                                        setCheckoutLoad
                                    );
                                }}
                                style={`${styles.circle} ${styles.bottomCircle}`} 
                            />
                        </>
                    </>
                )} 
            </main>
            {loginRequired && <LoginModal setShowLogin={setLoginRequired} />}
            {checkoutLoad && <div className={globalStyles.checkoutLoader}><Loader /></div>}
        </>
    );
}

// export default withProtected(Design);
export default Design;