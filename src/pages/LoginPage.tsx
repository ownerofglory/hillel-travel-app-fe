import {Navigation} from "../components/common/Navigation";
import React from "react";

export const LoginPage = () => {
    return (
        <div>
            <Navigation loggedIn={false}/>
            <h1>Login Page</h1>
        </div>
    );
};