import {GenericProps} from "./genericProps";
import {LocationModel} from "../models/locationModel";

export interface ExplorePopupProps extends GenericProps{
    location: LocationModel
    closeHandler: () => void
}