

import { api_get } from "@/assets/helpers";
import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface UserContextType{
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarOpen: boolean;
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    token: any;
    loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps{
    children: ReactNode;
}

export const UserProvider = ({children}: UserProviderProps) => {
    const [user, setUser] = useState<any>([]);
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        
        if(storedToken){
            setToken(storedToken);
            setAuth(true);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if(!token || loading) return;

        const getUser = async () => {
            try{
                const response = await api_get('users/profile', token);
                
                setUser(response.data);
            }catch(error){
                console.error("Failed to fetch user:", error);
                setAuth(false);
            }
        };

        getUser();
    }, [token, loading]);
    
    return(
        <UserContext.Provider value={{ user, token, auth, setAuth, setUser, loading, sidebarOpen, setSidebarOpen }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = ()=> {
    const context = useContext(UserContext);

    if(!context){
        throw new Error("useUser must be used within a UserProvider");
    }
    
    return context;
}