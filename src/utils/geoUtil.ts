import {LocationModel} from "../models/locationModel";
import {Coords} from "../models/coords";

const locationToPoint = (location: LocationModel): GeoJSON.Feature<GeoJSON.Geometry> => {
    const geo: GeoJSON.Point = {
        coordinates: [location.longitude, location.latitude],
        type: 'Point'
    }

    const feature: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        geometry: geo,
        properties: null
    }

    return feature
}

const locationsToFeatureCollection = (locations?: LocationModel[]): GeoJSON.FeatureCollection => {
    const features = locations?.map(locationToPoint)
    const featureCollection: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: features ?? []
    }
    return featureCollection
}

const locationsToBoundingBox = (locations?: LocationModel[]): GeoJSON.BBox => {
    if (!locations || locations.length === 0) {
        throw new Error("No locations provided");
    }

    // Initializing with the first location's longitude and latitude.
    let minLongitude = locations[0].longitude;
    let maxLongitude = locations[0].longitude;
    let minLatitude = locations[0].latitude;
    let maxLatitude = locations[0].latitude;

    for (const location of locations) {
        if (location.longitude < minLongitude) minLongitude = location.longitude;
        if (location.longitude > maxLongitude) maxLongitude = location.longitude;
        if (location.latitude < minLatitude) minLatitude = location.latitude;
        if (location.latitude > maxLatitude) maxLatitude = location.latitude;
    }

    // Returning the bounding box.
    return [minLongitude, minLatitude, maxLongitude, maxLatitude];
}

const formatSingleCoord = (coord: number, isLatitude: boolean): string => {
    const cardinal = isLatitude ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    const absoluteValue = Math.abs(coord);

    const degrees = Math.floor(absoluteValue);
    const minutes = Math.floor((absoluteValue - degrees) * 60);

    return `${degrees}° ${String(minutes).padStart(2, '0')}′${cardinal}`;
};

const formatCoords = (coords: Coords): string => {
    return `${formatSingleCoord(coords.longitude, false)}  ${formatSingleCoord(coords.latitude, true)}`;
}

export const geoUtil = {
    locationToPoint: locationToPoint,
    locationsToFeatureCollection: locationsToFeatureCollection,
    locationsToBoundingBox: locationsToBoundingBox,
    formatCoords: formatCoords
}