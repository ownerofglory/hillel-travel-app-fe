import {Navigation} from "../components/common/Navigation";
import React from "react";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {TravelEntry} from "../components/travel/TravelEntry";
import {MapContainer} from "../components/map/MapContainer";
import {LocationsSource} from "../components/map/sources/LocationsSource";
import {LocationsLayer} from "../components/map/layers/LocationsLayer";

export const CreateTravelEntryPage = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''

    return (
        <div>
            <Navigation />

            <div className="flex-container-hor flex-container-ver">
                <div className="half-screen mobile-top">
                    <h2>Create a travel entry</h2>
                    <VerticalContainer>

                    </VerticalContainer>
                </div>
                <div className="half-screen mobile-bottom">
                    <MapContainer accessToken={mapboxAccessToken} >
                        {/*<LocationsSource locations={locations}>*/}
                        {/*    <LocationsLayer />*/}
                        {/*</LocationsSource>*/}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};