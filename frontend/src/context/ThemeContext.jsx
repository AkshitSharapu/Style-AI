import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('default'); // 'default', 'male', 'female'
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('style_ai_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const toggleTheme = (newTheme) => {
        if (newTheme) {
            setTheme(newTheme.toLowerCase());
        }
    };

    const login = (userData) => {
        const initials = userData.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        const finalUserData = { ...userData, initials };
        setUser(finalUserData);
        localStorage.setItem('style_ai_user', JSON.stringify(finalUserData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('style_ai_user');
    };

    useEffect(() => {
        const body = document.body;
        body.classList.remove('male-theme', 'female-theme');
        if (theme === 'male') body.classList.add('male-theme');
        if (theme === 'female') body.classList.add('female-theme');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, user, login, logout }}>
            {children}
        </ThemeContext.Provider>
    );
};
