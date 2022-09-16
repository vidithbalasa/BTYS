// /* 
// Context for authentication
// */
// import React, { useState, useEffect, useContext, createContext } from 'react';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const authContext = createContext({ user: null, setUser: () => {} });

// export default function useAuth() {
//     return useContext(authContext);
// }

// export function AuthProvider(props) {
//     const [userCreds, setUserCreds] = useState(null);
//     const [error, setError] = useState("");

//     const loginWithGoogle = async () => {
