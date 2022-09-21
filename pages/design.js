import React, { useState } from 'react';
import { functions } from '../src/config/firebase.config';
import { httpsCallable } from 'firebase/functions';

export default function Design() {
    const [image, setImage] = useState(null);

    const callFunction = async () => {
        // const response = await functions.https.onResponse(
        //     'https://us-central1-btys-production.cloudfunctions.net/stableai-function',
        //     (request, response) => {
        //         response.send('Testing');
        //     }
        // )
        // console.log(response);
        // console.log(functions.)

        const response = await httpsCallable(functions, 'stableai-function')({
            prompt: 'test'
        });
        console.log(response);
    }

    return (
        <main>
            <h1>Design</h1>
            <button onClick={callFunction}>Call Function</button>
        </main>
    );
}