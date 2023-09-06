import React, {useEffect, useRef, useState} from "react";
import './user-dashboard-style.css'
import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {TravelEntry} from "../components/travel/TravelEntry";
import data from "../mockData"
import {LocationModel} from "../models/locationModel";
import {LocationsSource} from "../components/map/sources/LocationsSource";
import {LocationsLayer} from "../components/map/layers/LocationsLayer";
import {PageProps} from "../props/pageProps";
import useAuth from "../hooks/useAuth";

export const UserDashboardPage: React.FC<PageProps> = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [travelEntries, setTravelEntries] = useState(data.travelEntries)
    const [locations, setLocations] = useState<LocationModel[]>();
    const auth = useAuth()
    useEffect(() => {
        console.log('Auth changed:', auth);
    }, [auth]);


    const showLocationsOnMap = (locations: LocationModel[]) => {
        console.log('Show locations', locations)
        setLocations(locations)
    }

    console.log(auth)

    return (
        <div>
            <Navigation loggedIn={true} />

           <div className="flex-container-hor flex-container-ver">
               <div className="half-screen mobile-top">
                   <h2>Your trips</h2>
                   <VerticalContainer>
                       {
                           travelEntries.map(entry => (
                               <TravelEntry travelEntry={entry}
                                            key={entry.id}
                                            showLocationsHandler={showLocationsOnMap} />
                           ))
                       }
                   </VerticalContainer>
               </div>
               <div className="half-screen mobile-bottom">
                   <MapContainer accessToken={mapboxAccessToken} >
                       <LocationsSource locations={locations}>
                           <LocationsLayer />
                       </LocationsSource>
                   </MapContainer>
               </div>
           </div>

        </div>
    );
};