// import { auth, googleAuthProvider } from "../src/config/firebase"
// import { Image } from 'next/image'
import React from 'react';
import { withPublic } from "./src/hooks/route";

function Login() {
	// const { user, loginWithGoogle, error } = auth;
	return (
		<h1>Login Page</h1>
	);
		// <div>
		// 	{error && <h1>{error}</h1>}
		// 	<button onClick={loginWithGoogle}>Google</button>
		// 	<h1>{user?.uid}</h1>
		// </div>
}

export default Login;
// export default Login;

// export default function Enter(props) {
//     const user = null

//     // 1. User not signed in -- show sign in screen.
//     // 2. User signed in -- show content
//     return (
//         <main>
//             {user ? (
//                 <SignOutButton />
//             ) : (
//                 <SignInButton />
//             )}
//         </main>
//     )
// }

// // Sign in with google button
// function SignInButton() {
//     const signInWithGoogle = async () => {
//         await auth.signInWithPopup(googleAuthProvider);
//     }
//     return (
//         <button className="btn-google" onClick={signInWithGoogle}>
//             <Image src={'/google.png'} alt='Google Logo' /> Sign in with Google
//         </button>
//     )
// }

// // Sign out button
// function SignOutButton() {
//     return <button onClick={() => auth.signOut()}>Sign Out</button>
// }

// // // Sign in with email button
// // // function EmailForm() {

// // // }