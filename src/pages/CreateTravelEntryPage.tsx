import {Navigation} from "../components/common/Navigation";
import React from "react";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {MapContainer} from "../components/map/MapContainer";

export const CreateTravelEntryPage = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''

    return (
        <div>
            <Navigation loggedIn={true} />

            <div className="flex-container-hor flex-container-ver">
                <div className="half-screen mobile-top">
                    <h2>Create a travel entry</h2>
                    <VerticalContainer>

                    </VerticalContainer>
                </div>
                <div className="half-screen mobile-bottom">
                    <MapContainer accessToken={mapboxAccessToken} >
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};