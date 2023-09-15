import {GenericProps} from "./genericProps";
import {TravelEntryModel} from "../models/travelEntry";

export interface TravelEntryPageProps extends GenericProps {
    travelEntry: TravelEntryModel
}