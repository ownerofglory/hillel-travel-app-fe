import {Layer, SymbolLayer} from "react-map-gl";
import React from "react";
import {MapLayerProps} from "../../../props/mapLayerProps";

export const LocationsLayer: React.FC<MapLayerProps> = ({ children}) => {
    const layerStyle: SymbolLayer = {
        id: 'point',
        type: 'symbol',
        source: 'locationSource',
        layout: {
            'icon-image': 'map-location-marker',
            'icon-size': 0.08
        }
    };

    return (
        <Layer {...layerStyle}>
        </Layer>
    );
};