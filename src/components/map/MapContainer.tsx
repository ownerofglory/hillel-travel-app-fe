import {Map} from "react-map-gl";
import React, {useState} from "react";
import './map-container-style.css'
import {MapContainerProps} from "../../props/mapContainerProps";
import {Coords} from "../../models/coords";
import {ZoomControl} from "./controls/ZoomControl";
import {CurrentLocationControl} from "./controls/CurrentLocationControl";
import {VerticalControlContainer} from "./controls/VerticalControlContainer";
import {AddTripControl} from "./controls/AddTripControl";


const DEFAULT_COORDS: Coords = {longitude: 9.2, latitude: 48.75}
const DEFAULT_ZOOM = 10

export const MapContainer: React.FC<MapContainerProps> = ({accessToken}) => {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM)
    const [coords, setCoords] = useState(DEFAULT_COORDS);

    return (
        <div className="map-container">
            <Map mapboxAccessToken={accessToken}
                 initialViewState={{
                     longitude: coords.longitude,
                     latitude: coords.latitude,
                     zoom: zoom
                 }}
                 style={{
                     height: '100%',
                     width: '100%'
                 }}
                 mapStyle={'mapbox://styles/mapbox/outdoors-v12'}
                 attributionControl={false}
            >
                <AddTripControl />
                <VerticalControlContainer>
                    <CurrentLocationControl />
                    <ZoomControl/>
                </VerticalControlContainer>
            </Map>
        </div>
    );
};