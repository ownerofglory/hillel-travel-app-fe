import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import React from "react";
import './explore-page-style.css'
import {BoundingBox} from "../models/boundingBox";

export const ExplorePage = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''

    const onBoundingBoxChanged = (bbox: BoundingBox): Promise<any> => {
        console.log('Bounding box', bbox)
        return new Promise(resolve => {});
    }

    return (
        <div>
            <Navigation loggedIn={true} />


            <div className="full-screen-map">
                <MapContainer accessToken={mapboxAccessToken}
                              style={{height: '90vh'}}
                                boundingBoxChangeHandler={onBoundingBoxChanged}
                >

                </MapContainer>
            </div>
        </div>
    );
};