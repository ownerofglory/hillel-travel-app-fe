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
import {geoUtil} from "../../utils/geoUtil";
import {StyleControl} from "./controls/StyleControl";
import mapboxgl from "mapbox-gl";


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
    const [map, setMap] = useState<mapboxgl.Map>()
    const initViewState = {...coords, zoom: zoom}

    const onGetLocationSuccess = (position: GeolocationPosition) => {
        const {coords} = position
        setCoords(coords)
        map!.flyTo({center: [coords.longitude, coords.latitude] })
    }

    const onGetLocationError = (error: GeolocationPositionError) => {
        console.error('Unable to get current geo position', error)
    }

    const onMapLoad = async (e: MapboxEvent) => {
        setMap(e.target)

        geoUtil.getCurrentLocation(onGetLocationSuccess, onGetLocationError)

        const bounds = e.target.getBounds()
        const bbox: BoundingBox = geoUtil.boundsToBoundingBox(bounds)

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

            const bbox: BoundingBox = geoUtil.boundsToBoundingBox(bounds)
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

    const onStyleChange = (style: string) => {
        map?.setStyle(style)
    }

    return (
        <div className="map-container">
            <Map mapboxAccessToken={accessToken}
                 initialViewState={initViewState}
                 style={style ?? DEFAULT_MAP_STYLE}
                 mapStyle={'mapbox://styles/mapbox/outdoors-v12'} // "mapbox-gl": "^2.15.0",
                 // mapStyle={'mapbox://styles/mapbox/standard-beta'} // "mapbox-gl": "^3.0.0-beta.1",
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
                    <StyleControl styleChangehandler={onStyleChange}/>
                </VerticalControlContainer>
                {children}
            </Map>
        </div>
    );
};