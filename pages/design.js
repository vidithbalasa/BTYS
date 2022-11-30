import React, { useState, useEffect } from 'react';
import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';
import useAuth from '../src/auth/authContext';

function Design() {
    const [prompt, setPrompt] = useState('');
    const [token, setToken] = useState('');
    const [img, setImg] = useState('');
    const functions = getFunctions(getApp());
    const auth = useAuth();

    // Get jwt token on mount
    useEffect(() => {
        auth.user.getIdToken().then((token) => {
            setToken(token);
        });
        console.log('Rendered Page')
    }, []);

    // Call the function to get model prediction
    const callFunction = async () => {
        // create a reponse to the stableai-function with the header Access-Control-Allow-Origin: *
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        await stableaiCall({ prompt: prompt, token: token })
            .then((result) => {
                const img_url = result.data;
                setImg(img_url);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <main>
            <h1>Create a Design</h1>
            <div className='prompt-input'>
                <label htmlFor='prompt'>Input a prompt</label>
                <input
                    type='text'
                    name='prompt'
                    id='prompt'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>
            <div>
                <button onClick={callFunction}>Generate Image</button>
            </div>
            {img && <img src={img} alt='Generated Image' />}
        </main>
    );
}

export default withProtected(Design);
// export default Design;