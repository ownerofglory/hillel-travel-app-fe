import {createContext, useContext} from "react";
import {AuthContextProps} from "../props/authContextProps";
import AuthContext from "../context/authContext";


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth