import React from "react";
import './user-dashboard-style.css'
import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {TravelEntry} from "../components/travel/TravelEntry";

export const UserDashboardPage = () => {
    const accessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''

    return (
        <div>
            <Navigation />

           <div className="flex-container-hor flex-container-ver">
               <div className="half-screen mobile-top">
                   <VerticalContainer>
                       <TravelEntry/>
                       <TravelEntry/>
                       <TravelEntry/>
                   </VerticalContainer>
               </div>
               <div className="half-screen mobile-bottom">
                   <MapContainer accessToken={accessToken} >

                   </MapContainer>
               </div>
           </div>

        </div>
    );
};