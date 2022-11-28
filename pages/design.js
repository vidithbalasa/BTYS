import React, { useState } from 'react';
import { functions } from '../src/config/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';
import { getApp } from 'firebase/app';

function Design() {
    const [prompt, setPrompt] = useState('test');
    const functions = getFunctions(getApp());

    const callFunction = async () => {
        // const response = await functions.https.onResponse(
        //     'https://us-central1-btys-production.cloudfunctions.net/stableai-function',
        //     (request, response) => {
        //         response.send('Testing');
        //     }
        // )
        // console.log(response);
        // console.log(functions.)

        const corstHandler = cors({ origin: true });
        // create a reponse to the stableai-function with the header Access-Control-Allow-Origin: *
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        // const response = await stableaiCall({ prompt: prompt })
        //     .then((res) => res.json())
        //     .then((data) => console.log(data))
        //     .catch((err) => console.log(err));
        const response = await stableaiCall()
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    const callHelloWorld = async () => {
        const helloWorldCall = httpsCallable(functions, 'helloWorld')
        const response = await helloWorldCall()
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <main>
            <h1>Design</h1>
            <div>
                <button onClick={callFunction}>Call Function</button>
            </div>
            <div>
                <button onClick={callHelloWorld}>TEST FUNCTION</button>
            </div>
        </main>
    );
}

// export default withProtected(Design);
export default Design;