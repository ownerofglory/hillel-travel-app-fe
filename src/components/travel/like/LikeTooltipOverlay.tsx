import {OverlayTrigger, Tooltip, TooltipProps} from "react-bootstrap";
import React from "react";
import {GenericProps} from "../../../props/genericProps";
import {LikeTooltip} from "./LikeTooltip";
import {LikeModel} from "../../../models/likeModel";
import {LikeTooltipProps} from "../../../props/likeTooltipProps";

export const LikeTooltipOverlay: React.FC<GenericProps> = ({children}) => {
    const likes: LikeModel[] = [
        {
            user: {
                name: 'Some user 1',
                email: 'some.user@mail.com'
            }
        },
        {
            user: {
                name: 'Some user 2',
                email: 'some.user@mail.com'
            }
        },
        {
            user: {
                name: 'Some user 3',
                email: 'some.user@mail.com'
            }
        },
        {
            user: {
                name: 'Some user 4',
                email: 'some.user@mail.com'
            }
        },
        {
            user: {
                name: 'Some user 5',
                email: 'some.user@mail.com'
            }
        }
    ]

    const renderTooltip = (props: TooltipProps) => {
        const completeProps = {...props, likes: likes}
        return (<LikeTooltip {...completeProps} />)
    }

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={
                renderTooltip
            }
        >
            {
                children
            }
        </OverlayTrigger>
    );
};