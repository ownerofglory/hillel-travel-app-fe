import React, {useEffect, useRef, useState} from "react";
import './user-dashboard-style.css'
import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import {VerticalContainer} from "../components/verticalContainer/VerticalContainer";
import {TravelEntry} from "../components/travel/TravelEntry";
import {LocationModel} from "../models/locationModel";
import {LocationsSource} from "../components/map/sources/LocationsSource";
import {LocationsLayer} from "../components/map/layers/LocationsLayer";
import {PageProps} from "../props/pageProps";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {TravelEntryModel} from "../models/travelEntry";
import appConstants from "../constants/appConstants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlassMinus, faMapLocationDot, faPlus} from "@fortawesome/free-solid-svg-icons";

export const UserDashboardPage: React.FC<PageProps> = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [travelEntries, setTravelEntries] = useState<TravelEntryModel[]>([])
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
                        {
                            travelEntries.length > 0 ? (
                                <h2>Your trips</h2>
                            ): (
                                <div>
                                    <h2>You have no trips so far</h2>
                                    <p>Hit the
                                       <span className={'add-trip-icon'}>
                                            <FontAwesomeIcon icon={faPlus} style={{color: " #fcfcfc",}} />
                                            <FontAwesomeIcon icon={faMapLocationDot} style={{color: " #fcfcfc",}} />
                                       </span>
                                        icon on the map to document you first journey</p>
                                </div>
                            )
                        }
                        <VerticalContainer>
                            {
                                travelEntries.length > 0 ?
                                travelEntries.map(entry => (
                                    <TravelEntry travelEntry={entry}
                                                 key={entry.id}
                                                 showLocationsHandler={showLocationsOnMap} />
                                )): (<div></div>)
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