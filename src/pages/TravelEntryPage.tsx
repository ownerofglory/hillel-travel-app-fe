import useAuth from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import {useParams} from "react-router-dom";
import {TravelEntryModel} from "../models/travelEntry";
import appConstants from "../constants/appConstants";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {LocationEntry} from "../components/travel/LocationEntry";

const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''

export const TravelEntryPage = () => {
    const {auth} = useAuth()
    const {id} = useParams()
    const [travelEntry, setTravelEntry] = useState<TravelEntryModel>()

    const getTravelEntry = (id: number) => {
        return fetch(`${appConstants.baseUrl}/travelEntries/${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth?.token}`
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const tripId = parseInt(id ?? '-1')
        getTravelEntry(tripId).then((data: TravelEntryModel) => setTravelEntry(data))
    }, []);


    return (
        <div>
            <Navigation loggedIn={!!auth} />

            {
                auth ? (
                    <div className="flex-container-hor flex-container-ver">
                        <div className="half-screen mobile-top mobile-top content-container">
                            <h2>{travelEntry?.title}</h2>
                            <p>{travelEntry?.description}</p>
                            <VerticalContainer>
                                {
                                    travelEntry?.locations?.map(location => (
                                        <LocationEntry location={location}
                                                       key={`${location.latitude}-${location.longitude}`}/>
                                    ))
                                }
                            </VerticalContainer>
                        </div>
                        <div className="half-screen mobile-bottom">
                            <MapContainer accessToken={mapboxAccessToken} >

                            </MapContainer>
                        </div>
                    </div>
                ): (
                    <div></div>
                )
            }
        </div>
    );
};