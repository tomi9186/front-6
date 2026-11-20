import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [nadimak, setNadimak] = useState(() => localStorage.getItem("nadimak"));

    const login = useCallback((newToken, newNadimak) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("nadimak", newNadimak);
        setToken(newToken);
        setNadimak(newNadimak);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("nadimak");
        setToken(null);
        setNadimak(null);
    }, []);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "token" || e.key === "nadimak" || e.key === null) {
                setToken(localStorage.getItem("token"));
                setNadimak(localStorage.getItem("nadimak"));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const isAuthenticated = Boolean(token && nadimak);

    return (
        <AuthContext.Provider value={{ token, nadimak, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
