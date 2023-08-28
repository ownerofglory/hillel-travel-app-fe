import {GenericProps} from "./genericProps";
import {Coords} from "../models/coords";

export interface LocationMarkerProps extends GenericProps{
    coords: Coords
}