import React, {useEffect, useRef, useState} from "react";
import './user-dashboard-style.css'
import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {TravelEntry} from "../components/travel/TravelEntry";
import data from "../mockData"
import {LocationModel} from "../models/locationModel";
import {LocationsSource} from "../components/map/sources/LocationsSource";
import {LocationsLayer} from "../components/map/layers/LocationsLayer";
import {PageProps} from "../props/pageProps";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {TravelEntryModel} from "../models/travelEntry";
import appConstants from "../constants/appConstants";
import {createSecurePair} from "tls";

export const UserDashboardPage: React.FC<PageProps> = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [travelEntries, setTravelEntries] = useState(data.travelEntries)
    const [locations, setLocations] = useState<LocationModel[]>();
    const {auth} = useAuth()
    const navigate = useNavigate()

    const getTravelEntries = (): Promise<TravelEntryModel[]> => {
        return fetch(`${appConstants.baseUrl}/travelEntries/users?userId=${auth?.user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth?.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else return []
            }).catch(err => {
                console.log('error when getting travel entries')
                return []
            })

    }

    useEffect(() => {
        console.log('Auth changed:', auth);
        getTravelEntries().then(data => setTravelEntries(data))
    }, [auth]);



    const showLocationsOnMap = (locations: LocationModel[]) => {
        console.log('Show locations', locations)
        setLocations(locations)
    }

    console.log(auth)

    return (
        <div>
            <Navigation loggedIn={!!auth} />

            {auth ? (
                <div className="flex-container-hor flex-container-ver">
                    <div className="half-screen mobile-top">
                        <h2>Your trips</h2>
                        <VerticalContainer>
                            {
                                travelEntries.map(entry => (
                                    <TravelEntry travelEntry={entry}
                                                 key={entry.id}
                                                 showLocationsHandler={showLocationsOnMap} />
                                ))
                            }
                        </VerticalContainer>
                    </div>
                    <div className="half-screen mobile-bottom">
                        <MapContainer accessToken={mapboxAccessToken} >
                            <LocationsSource locations={locations}>
                                <LocationsLayer />
                            </LocationsSource>
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