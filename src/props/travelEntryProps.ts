import {GenericProps} from "./genericProps";
import {TravelEntryModel} from "../models/travelEntry";
import {LocationModel} from "../models/locationModel";

export interface TravelEntryProps extends GenericProps {
    travelEntry: TravelEntryModel
    showLocationsHandler: (locations: LocationModel[]) => void
}