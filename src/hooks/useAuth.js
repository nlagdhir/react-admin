import { Children, createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStgorage";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [user, setUser] = useLocalStorage('user',null);
    const navigate = useNavigate();


    // login user function to authenticate user
    const login= async (data) => {
        setUser(data);
        navigate('/profile');
    }

    // Logout user function
    const logout = () => {
        setUser([]);
        navigate('/')
    }

    const value = useMemo( () => ({
        user,
        login,
        logout
    }), [user]);

    return <AuthContext.Provider value={value} >{props.children}</AuthContext.Provider>;

}

export {AuthContext, AuthProvider};

