import {BoundingBox} from "../models/boundingBox";
import {LocationModel} from "../models/locationModel";

const generateMockLocations = (bbox: BoundingBox): LocationModel[] => {
    // Determine the number of mock locations
    const numLocations = Math.floor(Math.random() * 11) + 10; // random number between 10 and 20

    const locations: LocationModel[] = [];

    for (let i = 0; i < numLocations; i++) {
        // Generate random latitude and longitude within the bounding box
        const latitude = bbox.southWest.latitude + Math.random() * (bbox.northEast.latitude - bbox.southWest.latitude);
        const longitude = bbox.southWest.longitude + Math.random() * (bbox.northEast.longitude - bbox.southWest.longitude);

        // Add the location to the locations array
        locations.push({
            latitude,
            longitude,
            locationName: `Mock Location ${i + 1}` // Just an example naming scheme, you can adjust as needed
        });
    }

    return locations;
}

const getRandomImageUrl = (): string => {
    const rand = Math.floor(Math.random() * 100000)
    return `https://picsum.photos/100/100?random=${rand}`
}

export default {
    generateMockLocations: generateMockLocations,
    getRandomImageUrl: getRandomImageUrl
}