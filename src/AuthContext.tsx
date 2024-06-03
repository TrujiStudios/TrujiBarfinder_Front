// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface AuthContextType {
//     isAuthenticated: boolean;
//     login: () => void;
//     logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const login = () => setIsAuthenticated(true);
//     const logout = () => setIsAuthenticated(false);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

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
        const token = Cookies.get('token');
        console.log('Initial Token Check:', !!token); // Log for debugging
        return !!token;
    });

    const login = async () => {
        // Simulate login logic
        Cookies.set('token', document.cookie); // esta es la respuesta de la API en un entorno real fake-token sería el token real del usuario logueado
        console.log('Token <>:', Cookies.get('token')); // Log for debugging

        if (Cookies.get('token')) {
            console.log('Token Check:', !!Cookies.get('token')); // Log for debugging
            console.log('Si ahy token'); // Log for debugging
            setIsAuthenticated(true);
        }

    };

    const logout = () => {
        // Cookies.remove('isAuthenticated');
        Cookies.remove('token');
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


