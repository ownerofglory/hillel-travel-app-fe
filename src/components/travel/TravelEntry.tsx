import React from "react";
import './travel-style.css'
import {Button, Card} from "react-bootstrap";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {TravelEntryProps} from "../../props/travelEntryProps";
import {LikeTooltipOverlay} from "./like/LikeTooltipOverlay";

const PLACEHOLDER_IMAGE = "data:image/jpeg;base64,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"

export const TravelEntry: React.FC<TravelEntryProps> = ({travelEntry, showLocationsHandler}) => {
    const onTripClicked = () => {
        showLocationsHandler(travelEntry.locations)
    }

    const onViewClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
    }

    return (
        <div className={'travel-entry'}>
            <Card onClick={e => onTripClicked()}>
                <Card.Img variant="top" src={PLACEHOLDER_IMAGE} />
                <div className="gradient-overlay"></div>
                <div className="gradient-overlay-desktop"></div>
                <div className="image-overlay-desktop">
                    <Card.Title className={'travel-title-desktop'}>{travelEntry.title}</Card.Title>
                </div>
                <Card.Body className={'image-overlay'}>
                    <div>
                        <Card.Title className={'title-mobile'}>{travelEntry.title}</Card.Title>
                        <Card.Text>
                            {travelEntry.description}
                        </Card.Text>
                    </div>
                    <div className="travel-entry-bottom">
                        <Button variant="primary" onClick={onViewClick}>View</Button>

                        <div className={'reaction-button-container'}>
                            <LikeTooltipOverlay>
                                <Button className={'reaction-button'} variant="outline-light">
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>5</span>
                                </Button>
                            </LikeTooltipOverlay>
                            <Button className={'reaction-button'}  variant="outline-light">
                                <FontAwesomeIcon icon={faComment} />
                                <span>3</span>
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};