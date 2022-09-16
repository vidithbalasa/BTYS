import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth, provider } from '../config/firebase.config';
import { auth, provider } from '../src/config/firebase.config';
import AuthService from '../src/service/AuthService';

function Login(props) {
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={AuthService.login}>Login with Google</button>
        </div>
    )
}

export async function getStaticProps() {
    return { props: { isStatic: true } }
}

export default Login;