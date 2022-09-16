import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth, provider } from '../config/firebase.config';
import { auth, provider } from '../src/config/firebase.config';
import React from 'react';

export default function Login() {
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const creds = GoogleAuthProvider.credentialFromResult(result);
                const token = creds.accessToken;
                const user = result.user;
                console.log(`token: ${token}`);
                console.log(`user: ${user}`);
            })
            .catch((error) => {
                console.log(`Error Code: ${error.code}`);
                console.log(`Error: ${error.message}`);
            })
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={loginWithGoogle}>Login with Google</button>
        </div>
    )
}

// add Home to root of html
export async function getStaticProps() {
    return { props: { isStatic: true } }
}