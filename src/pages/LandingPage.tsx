import React from "react";
import {Navigation} from "../components/common/Navigation";

export const LandingPage = () => {
    return (
        <div>
            <Navigation loggedIn={true}/>

            <h1>Hillel Travel App</h1>
            <p>Coming soon...</p>
        </div>
    );
};