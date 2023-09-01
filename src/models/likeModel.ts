import {TravelEntryModel} from "./travelEntry";
import {User} from "./user";

export interface LikeModel {
    id?: number
    travelEntry?: TravelEntryModel
    user?: User
}