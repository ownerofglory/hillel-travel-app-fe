import {GenericProps} from "./genericProps";
import {TravelEntryModel} from "../models/travelEntry";

export interface TravelEntryProps extends GenericProps {
    travelEntry: TravelEntryModel
}