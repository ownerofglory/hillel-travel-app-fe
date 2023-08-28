import React, {useEffect, useState} from "react";
import { Popup } from "react-map-gl";
import {ExplorePopupProps} from "../../../props/explorePopupProps";
import {Coords} from "../../../models/coords";
import '../map-container-style.css'

export const LocationExplorePopup: React.FC<ExplorePopupProps> = ({location, closeHandler}) => {
    const [coords, setCoords] = useState<Coords>()

    useEffect(() => {
        const newCoords: Coords = {...location}
        setCoords(newCoords)
    }, [location])

    return coords ? (
        <Popup className={'location-pop-up'} style={{height: 200, width: 200}} longitude={coords!.longitude} latitude={coords!.latitude}
               anchor="bottom"
               onClose={e => closeHandler()}
        >
           <p>{location.locationName}</p>
        </Popup>
    ): (<div></div>);
};