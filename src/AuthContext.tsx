

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = Cookies.get('TrujiStudios'); // esta linea es la que se cambia por la cookie que se va a usar
        console.log('Initial Token Check:', !!token);
        return !!token;
    });

    const login = async () => {
        // Simulate login logic
        // Cookies.set('token', document.cookie);
        console.log('Token <>:', Cookies.get('TrujiStudios'));


        if (Cookies.get('TrujiStudios')) {
            console.log('Token Check:', !!Cookies.get('TrujiStudios')); // Log for debugging
            setIsAuthenticated(true);
        }

    };

    const logout = () => {
        // Cookies.remove('isAuthenticated');
        Cookies.remove('TrujiStudios');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


