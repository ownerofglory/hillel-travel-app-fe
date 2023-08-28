import {Map, MapboxEvent, ViewStateChangeEvent} from "react-map-gl";
import React, {useState} from "react";
import './map-container-style.css'
import {MapContainerProps} from "../../props/mapContainerProps";
import {Coords} from "../../models/coords";
import {ZoomControl} from "./controls/ZoomControl";
import {CurrentLocationControl} from "./controls/CurrentLocationControl";
import {VerticalControlContainer} from "./controls/VerticalControlContainer";
import {AddTripControl} from "./controls/AddTripControl";
import markerIcon from '../../assets/map-marker.png'
import {BoundingBox} from "../../models/boundingBox";


const DEFAULT_COORDS: Coords = {longitude: 9.2, latitude: 48.75}
const DEFAULT_ZOOM = 10
const DEFAULT_MAP_STYLE = {height: '100%', width: '100%'}

export const MapContainer: React.FC<MapContainerProps> = ({accessToken,
                                                              children,
                                                              style,
                                                              boundingBoxChangeHandler}) => {

    const [zoom, setZoom] = useState(DEFAULT_ZOOM)
    const [coords, setCoords] = useState(DEFAULT_COORDS);
    const initViewState = {...coords, zoom: zoom}

    const onMapLoad = (e: MapboxEvent) => {
        e.target.loadImage(markerIcon, (error, image) => {
            if (!error) {
                e.target.addImage('map-location-marker', image!)
            } else {
                console.error(error)
            }
        })
    }

    const onBoundingBoxChange = async (boundingBox: BoundingBox) => {
        if (boundingBoxChangeHandler) {
            await boundingBoxChangeHandler(boundingBox)
        }
    }

    const onMapMoveEnd = async (e: ViewStateChangeEvent) => {
        const bounds = e.target.getBounds()

        const bbox: BoundingBox = {northEast: {
                longitude: bounds.getNorthEast().lng,
                latitude: bounds.getNorthEast().lat
            }, southWest: {
                longitude: bounds.getSouthWest().lng,
                latitude: bounds.getSouthWest().lat
            }
        }
        await onBoundingBoxChange(bbox)
    }

    return (
        <div className="map-container">
            <Map mapboxAccessToken={accessToken}
                 initialViewState={initViewState}
                 style={style ?? DEFAULT_MAP_STYLE}
                 mapStyle={'mapbox://styles/mapbox/outdoors-v12'}
                 attributionControl={false}
                 onLoad={onMapLoad}
                 onMoveEnd={onMapMoveEnd}
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