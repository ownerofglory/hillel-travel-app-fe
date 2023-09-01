import {TravelEntryModel} from "./travelEntry";
import {User} from "./user";

export interface CommentModel {
    id?: number
    travelEntry?: TravelEntryModel
    user?: User
    commentText: string
}