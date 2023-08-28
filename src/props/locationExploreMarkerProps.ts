import {GenericProps} from "./genericProps";
import {LocationModel} from "../models/locationModel";

export interface LocationExploreMarkerProps extends GenericProps {
    location: LocationModel
    chosenHandler: (location: LocationModel) => void
}