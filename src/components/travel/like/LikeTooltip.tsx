import { forwardRef } from "react";
import {Tooltip, TooltipProps} from "react-bootstrap";
import { LikeTooltipProps } from "../../../props/likeTooltipProps";
import {LikeModel} from "../../../models/likeModel";
import {LikeEntry} from "./LikeEntry";

export const LikeTooltip = forwardRef((props: LikeTooltipProps, ref: any) => {
    return (
        <Tooltip {...props} ref={ref} id="button-tooltip-2">
            {
               props.likes.map(like => (
                   <LikeEntry user={like.user!} />
               ))
            }
        </Tooltip>
    );
});