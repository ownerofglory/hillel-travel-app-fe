import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import React from "react";
import './explore-page-style.css'

export const ExplorePage = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    return (
        <div>
            <Navigation />

            <div className="full-screen-map">
                <MapContainer accessToken={mapboxAccessToken} >

                </MapContainer>
            </div>
        </div>
    );
};