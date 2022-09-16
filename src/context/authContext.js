/* 
Context for authentication
*/
import React, { useState, useEffect, useContext, createContext } from 'react';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import AuthService from '../auth/AuthService';

const authContext = createContext({ user: null, setUser: () => {} });

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const loginWithGoogle = async () => {
        const { user, error } = await AuthService.login()
        setUser(user);
        setError(error);
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    }

    const value = { user, error, loginWithGoogle, logout, setUser };
    return <authContext.Provider value={value} {...props} />;
}
