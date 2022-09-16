import React, { useState, useEffect } from 'react';
import AuthService from '../service/AuthService';
import useAuth from '../hooks/auth';

export default function AuthStateChanged({ children }) {
    const { setUser } = useAuth()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        AuthService.waitForUser((userCred) => {
            setUser(userCred)
            setLoading(false)
        })
    })

    if (loading) {
        return <h1>Loading...</h1>
    }

    return children
}