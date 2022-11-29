import React, { useState } from 'react';
import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';
import useAuth from '../src/auth/authContext';

function Design() {
    const [prompt, setPrompt] = useState();
    const functions = getFunctions(getApp());
    const auth = useAuth();

    const callFunction = async () => {
        // create a reponse to the stableai-function with the header Access-Control-Allow-Origin: *
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        await stableaiCall({ prompt: prompt, token: getToken() })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getToken = () => {
        auth.user.getIdToken(true)
            .then(idToken => idToken)
            .catch((error) => {
                console.log(error);
                return null;
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
        </main>
    );
}

export default withProtected(Design);
// export default Design;