import {Button, Card } from "react-bootstrap";
import React, {ChangeEvent, useRef, useState} from "react";
import {LocationEntryProps} from "../../props/locationEntryProps";
import { faLocationDot, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeHolderImage from '../../assets/image-placeholder.png'
import './localtion-style.css'
import {geoUtil} from "../../utils/geoUtil";

export const LocationEntry: React.FC<LocationEntryProps> = ({location}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgSrc, setImgSrc] = useState(placeHolderImage);

    const handleImageClick = () => {
        fileInputRef.current?.click(); // Trigger the hidden file input
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgSrc(reader.result as string); // Update the displayed image
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <Card className={'margin-bottom-top location-card'}>
            <Card.Body>
                <div className="horizontal-container card-body-container">
                    <div className="flex-child">
                        <Card.Img src={imgSrc} onClick={handleImageClick} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                    <div className="flex-child"></div>
                    <div className="flex-child location-body">
                        <Card.Title>
                            {'Picked location'}
                        </Card.Title>
                        <Card.Text>
                            <Button variant="link">
                                <FontAwesomeIcon icon={faLocationDot} />{' '}
                                {geoUtil.formatCoords({...location})}
                            </Button>
                        </Card.Text>
                        <Button variant={'outline-light'}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};