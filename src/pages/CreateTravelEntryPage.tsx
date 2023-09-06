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
import constants from '../constants/appConstants'
import {TravelEntryModel} from "../models/travelEntry";
import {PageProps} from "../props/pageProps";

export const CreateTravelEntryPage: React.FC<PageProps> = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [pickedLocations, setPickedLocations] = useState<LocationModel[]>([])
    const [tripName, setTripName] = useState<string>();

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

    const createButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const trip: TravelEntryModel = {
            title: tripName ?? `Trip-${new Date().toLocaleTimeString()}`,
            description: '',
            locations: pickedLocations
        }

        fetch(constants.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(data => console.log(data))
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
                        value={tripName ?? ''}
                        onChange={e => setTripName(e.currentTarget.value)}
                    />

                    <p>Pick locations by clicking on or touching the map</p>

                    <VerticalContainer>
                        {
                            pickedLocations.map(loc => (
                                <LocationEntry key={`${loc.latitude}-${loc.longitude}`}  location={loc}/>
                            ))
                        }
                    </VerticalContainer>


                    <Button variant="primary" onClick={createButtonClick} disabled={!pickedLocations || !tripName}>Save</Button>
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