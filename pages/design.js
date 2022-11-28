import React, { useState } from 'react';
import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';

function Design() {
    const [prompt, setPrompt] = useState('test');
    const functions = getFunctions(getApp());

    const callFunction = async () => {
        // const corsHandler = cors({ origin: true });
        // create a reponse to the stableai-function with the header Access-Control-Allow-Origin: *
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        await stableaiCall()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });

        // const response = await stableaiCall()
        //     .then((result) => {
        //         // Read result of the Cloud Function.
        //         const data = result.data;
        //         const sanitizedMessage = data.text;
        //         console.log(sanitizedMessage);
        //     })
        //     .catch((error) => {
        //         // Getting the Error details.
        //         const code = error.code;
        //         const message = error.message;
        //         const details = error.details;
        //         console.log(code, message, details);
        //     });
    }

    return (
        <main>
            <h1>Create an Image</h1>
            <div>
                <button onClick={callFunction}>Call Function</button>
            </div>
        </main>
    );
}

// export default withProtected(Design);
export default Design;