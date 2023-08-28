import {GenericProps} from "./genericProps";
import {BoundingBox} from "../models/boundingBox";
import React, {CSSProperties} from "react";
import {Coords} from "../models/coords";

export interface MapContainerProps extends GenericProps {
    accessToken: string
    style?: CSSProperties
    boundingBoxChangeHandler?: (bbox: BoundingBox) => Promise<any>
    mapClickedHandler?: (coords: Coords) => Promise<any>
}