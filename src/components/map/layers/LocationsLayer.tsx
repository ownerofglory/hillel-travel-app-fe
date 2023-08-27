import {Layer, SymbolLayer, useMap} from "react-map-gl";
import React from "react";
import {MapLayerProps} from "../../../props/mapLayerProps";

export const LocationsLayer: React.FC<MapLayerProps> = ({ children}) => {
    const {current: map} = useMap()

    const layerStyle: SymbolLayer = {
        id: 'locationLayer',
        type: 'symbol',
        source: 'locationSource',
        layout: {
            'icon-image': 'map-location-marker',
            'icon-size': 0.08
        }
    };

    map!.on('click', 'locationLayer', event => {
        console.log(event)
    })

    return (
        <Layer {...layerStyle}>
        </Layer>
    );
};