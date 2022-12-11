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

    // Call the function to get model prediction
    const callFunction = async () => {
        setLoading(true);
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

    const createMockupFromImage = () => {
        addImage({ url: img, prompt: prompt });
        router.push('/create');
    }

    return (
        <div>
            <main className={`${globalStyles.main} ${globalStyles.mainAuth}`}>
                <h1 className={globalStyles.title}>Create a Design</h1>
                <div className={styles.promptBox}>
                    <label htmlFor='prompt' className={styles.promptLabel}>Input a prompt</label>
                    <input
                        type='text'
                        name='prompt'
                        id='prompt'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className={styles.promptInput}
                    />
                    <button 
                        onClick={callFunction}
                        disabled={loading || prompt === ''}
                        className={styles.promptButton}
                    >Generate Image</button>
                </div>
                {img ? (
                    <div>
                        <Image src={img} alt='Generated Image' className={styles.image} height={512} width={512} />
                        <button onClick={createMockupFromImage}>Create Product with Image</button>
                    </div>
                    ) : (
                        loading && <Loader />
                    )
                }
            </main>
        </div>
    );
}

export default withProtected(Design);
// export default Design;