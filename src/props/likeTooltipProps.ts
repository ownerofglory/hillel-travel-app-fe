import {GenericProps} from "./genericProps";
import {LikeModel} from "../models/likeModel";
import {TooltipProps} from "react-bootstrap";

export interface LikeTooltipProps extends TooltipProps {
    likes: LikeModel[]
}