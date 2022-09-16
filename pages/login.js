import React, { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth, provider } from '../config/firebase.config';
import { auth, provider } from '../src/config/firebase.config';
import AuthService from '../src/auth/AuthService';
import Image from 'next/image';
import '../styles/login.module.css'
import { withPublic } from '../src/auth/route';

function Login(props) {
    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div className='outer-div'>
            <h1 className='title'>Login Page</h1>
            <div className='inner-div'>
                {/* Button that says login with google with the google logo next to it pulled locally in the public directory */}
                <button onClick={() => AuthService.login()}>
                    <Image src="/google-logo.png" alt="Google Logo" width={18} height={18} />
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    return { props: { isStatic: true } }
}

export default withPublic(Login);