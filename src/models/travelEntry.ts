import {LocationModel} from "./locationModel";

export interface TravelEntryModel {
    id:  number | null
    title: string
    description: string | ''
    locations: LocationModel[]
}