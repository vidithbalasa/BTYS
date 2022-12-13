import React, { useState, useContext } from 'react';
// import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';
import useAuth from '../src/auth/authContext';
import Image from 'next/image';
import styles from '../styles/design.module.css';
import globalStyles from '../styles/global.module.css';
import creationContext from '../src/context/creationContext';
import { useRouter } from 'next/router';
import Loader from '../components/loader';

function Design() {
    const [prompt, setPrompt] = useState('');
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const functions = getFunctions(getApp());
    const { user } = useAuth();
    const { addImage } = useContext(creationContext);
    const router = useRouter();
    const image_size = 384;

    // const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'

    // Call the function to get model prediction
    const callFunction = async () => {
        setLoading(true);
        setImg('');
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        await stableaiCall({ prompt: prompt, token: user.accessToken })
            .then((result) => {
                const img_url = result.data;
                setImg(img_url);
            })
            .catch((error) => {
                console.log(error);
            });
        setLoading(false);
        setPrompt('');
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
                    <button 
                        onClick={callFunction}
                        disabled={loading || prompt === ''}
                        className={styles.promptButton}
                    >
                        {loading 
                            ? <div className={styles.loader}><Loader /></div> 
                            :'Generate an Image'
                        }
                    </button>
                </div>
                {img && (
                    <div className={styles.imageBox}>
                        <Image src={img} alt='Generated Image' className={styles.image} height={image_size} width={image_size} />
                    </div>
                )} 
            </main>
        </>
    );
}

export default withProtected(Design);
// export default Design;