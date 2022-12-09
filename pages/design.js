import React, { useState, useEffect } from 'react';
// import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';
import useAuth from '../src/auth/authContext';
import Image from 'next/image';
import styles from '../styles/design.module.css';
import globalStyles from '../styles/global.module.css';

function Design() {
    const [prompt, setPrompt] = useState('');
    const [img, setImg] = useState('');
    const functions = getFunctions(getApp());
    const { user } = useAuth();

    // Call the function to get model prediction
    const callFunction = async () => {
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        await stableaiCall({ prompt: prompt, token: user.accessToken })
            .then((result) => {
                const img_url = result.data;
                setImg(img_url);
            })
            .catch((error) => {
                console.log(error);
            });
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
                        disabled={prompt === ''}
                        className={styles.promptButton}
                    >Generate Image</button>
                </div>
                {img && <Image src={img} alt='Generated Image' className={styles.image} />}
                {/* button that console logs user */}
                <button onClick={() => console.log(user)}>Log User</button>
            </main>
        </div>
    );
}

export default withProtected(Design);
// export default Design;