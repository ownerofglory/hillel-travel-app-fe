import {LocationModel} from "./locationModel";

export interface TravelEntryModel {
    id?:  number | null
    title: string
    description: string | ''
    locations: LocationModel[],
    createdAt?: Date
    likeCount?: number
    userId?: number | undefined
    commentCount?: number
}