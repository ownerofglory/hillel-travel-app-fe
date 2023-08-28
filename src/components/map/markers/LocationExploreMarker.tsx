import React from "react";
import {LocationExploreMarkerProps} from "../../../props/locationExploreMarkerProps";
import './location-style.css'
import mockUtil from "../../../utils/mockUtil";
import {Marker, MarkerEvent} from "react-map-gl";

export const LocationExploreMarker: React.FC<LocationExploreMarkerProps> = ({location, chosenHandler}) => {

    const onMarkerClicked = () => {
        console.log('marker clicked')
        chosenHandler(location)
    }

    return (
        <Marker longitude={location.longitude}
                latitude={location.latitude}
                anchor="bottom"
                onClick={onMarkerClicked}
        >
            <img className={'marker-image'} height={42}  src={mockUtil.getRandomImageUrl()} />
        </Marker>
    );
};