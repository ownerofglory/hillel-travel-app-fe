import {AuthModel} from "../models/authModel";

export interface AuthContextProps {
    auth: AuthModel | undefined;
    setAuth: React.Dispatch<React.SetStateAction<AuthModel | undefined>>;
}