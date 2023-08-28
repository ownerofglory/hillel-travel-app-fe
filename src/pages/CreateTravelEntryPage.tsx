import {Navigation} from "../components/common/Navigation";
import React, {useState} from "react";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {MapContainer} from "../components/map/MapContainer";
import {Coords} from "../models/coords";
import {LocationPickMarker} from "../components/map/markers/LocationPickMarker";
import {LocationModel} from "../models/locationModel";
import {LocationEntry} from "../components/travel/LocationEntry";
import './create-travel-page-style.css'
import {Button, Form } from "react-bootstrap";

export const CreateTravelEntryPage = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [pickedLocations, setPickedLocations] = useState<LocationModel[]>([])

    const createMarker = (coords: Coords) => {
        return (
            <LocationPickMarker key={`${coords.latitude}-${coords.longitude}`} coords={coords} />
        )
    }

    const onLocationPick = (coords: Coords): Promise<any> => {
        console.log('Picked location', coords)

        const location: LocationModel = {
            ...coords,
            locationName: ''
        }

        const newLocations = [...pickedLocations, location]
        setPickedLocations(newLocations)

        return new Promise<any>(resolve => {})
    }

    return (
        <div>
            <Navigation loggedIn={true} />

            <div className="flex-container-hor flex-container-ver">
                <div className="half-screen mobile-top content-container">
                    <h2>Create a travel entry</h2>

                    <Form.Control
                        type="text"
                        id="inputTripName"
                        aria-describedby="passwordHelpBlock"
                        placeholder={'Enter travel entry name'}
                    />

                    <p>Pick locations by clicking on or touching the map</p>

                    <VerticalContainer>
                        {
                            pickedLocations.map(loc => (
                                <LocationEntry key={`${loc.latitude}-${loc.longitude}`}  location={loc}/>
                            ))
                        }
                    </VerticalContainer>
                    <Button variant="primary">Save</Button>
                </div>
                <div className="half-screen mobile-bottom">
                    <MapContainer accessToken={mapboxAccessToken} mapClickedHandler={onLocationPick} >
                        {
                            pickedLocations.map(createMarker)
                        }
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};