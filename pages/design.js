import React, { useState } from 'react';
import { functions } from '../src/config/firebase.config';
import { httpsCallable } from 'firebase/functions';
import { withProtected } from '../src/auth/route';

function Design() {
    const [prompt, setPrompt] = useState('test');

    const callFunction = async () => {
        // const response = await functions.https.onResponse(
        //     'https://us-central1-btys-production.cloudfunctions.net/stableai-function',
        //     (request, response) => {
        //         response.send('Testing');
        //     }
        // )
        // console.log(response);
        // console.log(functions.)

        // create a reponse to the stableai-function with the header Access-Control-Allow-Origin: *
        const stableaiCall = httpsCallable(functions, 'stableai-function')
        const response = await stableaiCall({ prompt: prompt })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <main>
            <h1>Design</h1>
            <button onClick={callFunction}>Call Function</button>
        </main>
    );
}

export default withProtected(Design);