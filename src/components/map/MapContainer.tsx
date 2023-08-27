import {Map, MapboxEvent} from "react-map-gl";
import React, {useState} from "react";
import './map-container-style.css'
import {MapContainerProps} from "../../props/mapContainerProps";
import {Coords} from "../../models/coords";
import {ZoomControl} from "./controls/ZoomControl";
import {CurrentLocationControl} from "./controls/CurrentLocationControl";
import {VerticalControlContainer} from "./controls/VerticalControlContainer";
import {AddTripControl} from "./controls/AddTripControl";
import markerIcon from '../../assets/map-marker.png'


const DEFAULT_COORDS: Coords = {longitude: 9.2, latitude: 48.75}
const DEFAULT_ZOOM = 10

export const MapContainer: React.FC<MapContainerProps> = ({accessToken, children}) => {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM)
    const [coords, setCoords] = useState(DEFAULT_COORDS);
    const initViewState = {...coords, zoom: zoom}
    const mapStyle = {height: '100%', width: '100%'}

    const onMapLoad = (e: MapboxEvent) => {
        e.target.loadImage(markerIcon, (error, image) => {
            if (!error) {
                e.target.addImage('map-location-marker', image!)
            } else {
                console.error(error)
            }
        })
    }

    return (
        <div className="map-container">
            <Map mapboxAccessToken={accessToken}
                 initialViewState={initViewState}
                 style={mapStyle}
                 mapStyle={'mapbox://styles/mapbox/outdoors-v12'}
                 attributionControl={false}
                 onLoad={onMapLoad}
            >
                <AddTripControl />
                <VerticalControlContainer>
                    <CurrentLocationControl />
                    <ZoomControl/>
                </VerticalControlContainer>
                {children}
            </Map>
        </div>
    );
};