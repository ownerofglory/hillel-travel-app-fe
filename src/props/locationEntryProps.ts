import {GenericProps} from "./genericProps";
import {LocationModel} from "../models/locationModel";

export interface LocationEntryProps extends GenericProps{
    location: LocationModel
    locationChangeHandler?: (location: LocationModel) => void
    editable?: boolean
    removable?: boolean
}