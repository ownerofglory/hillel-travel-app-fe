import {Source, useMap} from "react-map-gl";
import React, {useEffect} from "react";
import {MapSourceProps} from "../../../props/mapSourceProps";
import {geoUtil} from "../../../utils/geoUtil";
import {LocationModel} from "../../../models/locationModel";

export const LocationsSource: React.FC<MapSourceProps> = ({children, locations}) => {
    const {current: map} = useMap()

    const fitLocationBounds = (locations?: LocationModel[]) => {
        if (locations) {
            const bbox = geoUtil.locationsToBoundingBox(locations)
            const [minLongitude, minLatitude, maxLongitude, maxLatitude] = bbox
            const mapBounds: [number, number, number, number] = [minLongitude, minLatitude, maxLongitude, maxLatitude]
            map!.fitBounds(mapBounds, {padding: {
                    top: 40,
                    bottom: 20,
                    left: 20,
                    right: 20
                }, maxZoom: 15})
        }
    }

    const showLocations = (locations?: LocationModel[]) => {
        fitLocationBounds(locations)
        return geoUtil.locationsToFeatureCollection(locations)
    }

    return (
        <Source id={'locationSource'}
                type={'geojson'}
                data={showLocations(locations)}>
            {children}
        </Source>
    );
};