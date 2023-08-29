import {
    LngLatBounds,
    Map,
    MapboxEvent,
    MapLayerMouseEvent,
    MapLayerTouchEvent,
    ViewStateChangeEvent
} from "react-map-gl";
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
                                                              boundingBoxChangeHandler,
                                                              mapClickedHandler}) => {

    const [zoom, setZoom] = useState(DEFAULT_ZOOM)
    const [coords, setCoords] = useState(DEFAULT_COORDS);
    const initViewState = {...coords, zoom: zoom}

    const boundsToBoundingBox = (bounds: LngLatBounds): BoundingBox => {
        const bbox: BoundingBox = {northEast: {
                longitude: bounds.getNorthEast().lng,
                latitude: bounds.getNorthEast().lat
            }, southWest: {
                longitude: bounds.getSouthWest().lng,
                latitude: bounds.getSouthWest().lat
            }
        }

        return bbox
    }

    const onMapLoad = async (e: MapboxEvent) => {
        const bounds = e.target.getBounds()
        const bbox: BoundingBox = boundsToBoundingBox(bounds)

        await onBoundingBoxChange(bbox)

        e.target.loadImage(markerIcon, (error, image) => {
            if (!error) {
                e.target.addImage('map-location-marker', image!)
            } else {
                console.error(error)
            }
        })
    }

    const onBoundingBoxChange = async (boundingBox: BoundingBox) => {
        if (boundingBoxChangeHandler && (zoom >= 9)) {
            await boundingBoxChangeHandler(boundingBox)
        }
    }

    const onMapMoveEnd = async (e: ViewStateChangeEvent) => {
        if (e.type == 'moveend' || e.type == 'zoomend') {
            const bounds = e.target.getBounds()

            const bbox: BoundingBox = boundsToBoundingBox(bounds)
            return await onBoundingBoxChange(bbox)
        }

        return Promise.resolve()
    }

    const onMapClicked = async (e: MapLayerMouseEvent) => {
        const point = e.lngLat
        if (mapClickedHandler) {
            await mapClickedHandler({latitude: point.lat, longitude: point.lng})
        }
    }

    const onMapTouchEnded = async (e: MapLayerTouchEvent) => {
        const point = e.lngLat
        if (mapClickedHandler) {
            await mapClickedHandler({latitude: point.lat, longitude: point.lng})
        }
    }

    const onMapZoom = (e: ViewStateChangeEvent) => {
        const {zoom} = e.viewState
        setZoom(zoom)
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
                 onClick={onMapClicked}
                 onTouchEnd={onMapTouchEnded}
                 onZoom={onMapZoom}
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