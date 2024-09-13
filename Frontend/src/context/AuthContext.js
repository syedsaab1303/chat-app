import React, { createContext, useState, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser(response.user); // Assuming the response contains user data
            localStorage.setItem('token', response.token);
        } catch (error) {
            throw new Error(error.message || 'Login failed. please check your email or password ');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


// login: Backend se login service ko call karta hai. Agar login successful hota hai, toh user data ko set karta hai aur token ko localStorage mein store karta hai.