import {TravelEntryModel} from "./travelEntry";

export interface LocationModel {
    longitude: number,
    latitude: number,
    locationName: string | ''
    travelEntry?: TravelEntryModel
}