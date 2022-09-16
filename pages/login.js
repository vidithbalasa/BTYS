import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth, provider } from '../config/firebase.config';
import { auth, provider } from '../src/config/firebase.config';
import AuthService from '../src/service/AuthService';
import Image from 'next/image';
import '../styles/login.module.css'

function Login(props) {
    return (
        <div className='outer-div'>
            <h1 className='title'>Login Page</h1>
            <div className='inner-div'>
                {/* Button that says login with google with the google logo next to it pulled locally in the public directory */}
                <button onClick={() => AuthService.login()}>
                    <Image src="/google-logo.png" alt="Google Logo" width={20} height={20} />
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    return { props: { isStatic: true } }
}

export default Login;