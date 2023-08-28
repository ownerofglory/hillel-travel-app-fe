import {Marker} from "react-map-gl";
import markerImage from "../../../assets/pick-marker.png";
import React from "react";
import {LocationMarkerProps} from "../../../props/locationMarkerProps";

export const LocationPickMarker: React.FC<LocationMarkerProps> = ({coords}) => {
    return (
        <Marker longitude={coords.longitude}
                latitude={coords.latitude}
                anchor="bottom" >
            <img height={42}  src={markerImage} />
        </Marker>
    );
};