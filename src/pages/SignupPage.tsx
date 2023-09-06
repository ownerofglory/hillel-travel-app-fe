import {Navigation} from "../components/common/Navigation";
import React from "react";
import {PageProps} from "../props/pageProps";

export const SignupPage: React.FC<PageProps> = () => {
    return (
        <div>
            <Navigation loggedIn={false}/>
            <h1>Signup Page</h1>
        </div>
    );
};