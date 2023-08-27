import {GenericProps} from "./genericProps";
import {SourceProps} from "react-map-gl";
import {LocationModel} from "../models/locationModel";

export interface MapSourceProps extends GenericProps {
    children: SourceProps
    locations?: LocationModel[]
}