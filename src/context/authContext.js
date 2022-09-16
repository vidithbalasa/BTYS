/* 
Context for authentication
*/
import React, { useState, useEffect, useContext, createContext } from 'react';

const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}