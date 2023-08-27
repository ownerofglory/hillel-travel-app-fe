import {LocationModel} from "../models/locationModel";

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

export const geoUtil = {
    locationToPoint: locationToPoint,
    locationsToFeatureCollection: locationsToFeatureCollection,
    locationsToBoundingBox: locationsToBoundingBox
}