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
import {TravelEntryModel} from "../models/travelEntry";
import {PageProps} from "../props/pageProps";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import appConstants from "../constants/appConstants";

export const CreateTravelEntryPage: React.FC<PageProps> = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [pickedLocations, setPickedLocations] = useState<LocationModel[]>([])
    const [tripName, setTripName] = useState<string>();
    const [tripDescription, setTripDescription] = useState<string>();
    const {auth} = useAuth()
    const navigate = useNavigate()

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
            description: tripDescription ?? '',
            userId: auth?.user?.id,
            locations: pickedLocations,
            imageUrl: pickedLocations.find(location => !!location.imageUrl)?.imageUrl ?? 'https://livingecuadortravel.com/wp-content/uploads/2023/01/placeholder-2.png'
        }

        fetch(`${appConstants.baseUrl}/travelEntries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return res.json().then(err => {
                    throw new Error(err.message || res.statusText);
                }).catch(() => {
                    throw new Error(res.statusText);
                });
        }).then(trip => navigate('/dashboard'))
            .catch(e => console.log(e.message))
    }

    const onLocationChange = (location: LocationModel) => {
        console.log('Location change', location)
        pickedLocations.forEach(loc => {
            if (loc.longitude == location.longitude && loc.latitude == location.latitude) {
                loc.locationName = location.locationName
                loc.imageUrl = location.imageUrl
            }
        })

        console.log(pickedLocations)

        setPickedLocations(pickedLocations)
    }

    return (
        <div>
            <Navigation loggedIn={!!auth} />

            {
                auth ? (
                    <div className="flex-container-hor flex-container-ver">
                        <div className="half-screen mobile-top content-container">
                            <h2>Create a travel entry</h2>

                            <Form.Control
                                type="text"
                                id="inputTripName"
                                placeholder={'Enter travel entry name'}
                                value={tripName ?? ''}
                                onChange={e => setTripName(e.currentTarget.value)}
                            />
                            <Form.Control
                                type="text"
                                id="inputTripDescription"
                                as="textarea"
                                rows={2}
                                placeholder={'Enter travel description'}
                                value={tripDescription ?? ''}
                                onChange={e => setTripDescription(e.currentTarget.value)}
                            />

                            <p>Pick locations by clicking on or touching the map</p>

                            <VerticalContainer>
                                {
                                    pickedLocations.map(loc => (
                                        <LocationEntry key={`${loc.latitude}-${loc.longitude}`}
                                                       removable={true}
                                                       editable={true}
                                                       location={loc}
                                                       locationChangeHandler={onLocationChange}/>
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
                ) : (
                    <div></div>
                )
            }

        </div>
    );
};