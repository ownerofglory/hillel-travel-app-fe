import {Navigation} from "../components/common/Navigation";
import React, {useEffect} from "react";
import useAuth from "../hooks/useAuth";

export const LogoutPage = () => {
    const {auth, setAuth} = useAuth()

    useEffect(() => {
        localStorage.removeItem('auth')
        localStorage.removeItem('jwt')
        setAuth(undefined)

    }, []);

    return (
        <div>
            <Navigation loggedIn={false} />
            <h2>See you again soon :)</h2>
        </div>
    );
};