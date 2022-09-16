import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth, provider } from '../config/firebase.config';
import { auth, provider } from '../src/config/firebase.config';
import React from 'react';
import { withPublic } from '../src/hooks/route';

function Login() {
    const { user, loginWithGoogle, error } = auth;
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

export default withPublic(Login);