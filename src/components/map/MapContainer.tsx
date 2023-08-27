import {Map} from "react-map-gl";
import React from "react";
import './map-container-style.css'
import {MapContainerProps} from "../../props/mapContainerProps";

export const MapContainer: React.FC<MapContainerProps> = ({accessToken}) => {
    return (
        <div className="map-container">
            <Map mapboxAccessToken={accessToken}
                 initialViewState={{
                     longitude: 9.2,
                     latitude: 48.75,
                     zoom: 10
                 }}
                 style={{
                     height: '100%',
                     width: '100%'
                 }}
                 mapStyle={'mapbox://styles/mapbox/outdoors-v12'}
                 attributionControl={false}
            >

            </Map>
        </div>
    );
};