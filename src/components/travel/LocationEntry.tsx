import {Button, Card } from "react-bootstrap";
import React, {ChangeEvent, useRef, useState} from "react";
import {LocationEntryProps} from "../../props/locationEntryProps";
import { faLocationDot, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeHolderImage from '../../assets/image-placeholder.png'
import './localtion-style.css'
import {geoUtil} from "../../utils/geoUtil";
import {read} from "fs";
import appConstants from "../../constants/appConstants";
import {FileUploadResult} from "../../models/fileUploadResult";
import useAuth from "../../hooks/useAuth";

export const LocationEntry: React.FC<LocationEntryProps> = ({
                                                                location,
                                                                locationChangeHandler,
                                                                removable,
                                                                editable
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgSrc, setImgSrc] = useState<string>(location.imageUrl ?? placeHolderImage);
    const {auth} = useAuth()

    const handleImageClick = () => {
        if (editable) {
            fileInputRef.current?.click();
        }
    }

    const uploadImage = async () => {
        if (!fileInputRef.current?.files?.length) {
            return; // No file chosen
        }

        const file = fileInputRef.current.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', `image${new Date().getMilliseconds()}-${Math.floor(Math.random() * 100)}${file.name}`);

        try {
            const response = await fetch(`${appConstants.baseUrl}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${auth?.token}`
                }
            });

            if (!response.ok) {
                throw new Error("Server responded with a non-OK status");
            }

            const responseData = await response.json();
            return responseData
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgSrc(reader.result as string); // Update the displayed image
                uploadImage().then((data: FileUploadResult) => {
                    setImgSrc(data.fileUrl)
                    if (locationChangeHandler) {
                        locationChangeHandler({...location, imageUrl: data.fileUrl})
                    }
                })
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
                        {
                            removable ? (
                                <Button variant={'outline-light'}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </Button>
                            ): (<div></div>)
                        }
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};