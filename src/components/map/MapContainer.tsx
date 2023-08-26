import {Map} from "react-map-gl";
import React from "react";
import './map-container-style.css'

import ReactMapGL, {NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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