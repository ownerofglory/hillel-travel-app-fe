import {GenericProps} from "./genericProps";
import {BoundingBox} from "../models/boundingBox";
import React, {CSSProperties} from "react";

export interface MapContainerProps extends GenericProps {
    accessToken: string
    style?: CSSProperties
    boundingBoxChangeHandler?: (bbox: BoundingBox) => Promise<any>
}