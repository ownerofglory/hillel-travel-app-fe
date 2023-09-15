import {Navigation} from "../components/common/Navigation";
import React from "react";
import useAuth from "../hooks/useAuth";

export const ErrorPage = () => {
    const {auth} = useAuth()

    return (
        <div>
            <Navigation loggedIn={!!auth}/>
            <div>
                <h3>Something went wrong on our side... Sorry :( </h3>
                <h4>We're working to fix it ;)</h4>
            </div>
        </div>
    );
};