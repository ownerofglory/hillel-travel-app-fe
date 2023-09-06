import {createContext} from "react";
import {AuthContextProps} from "../props/authContextProps";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext