import {Navigation} from "../components/common/Navigation";
import {MapContainer} from "../components/map/MapContainer";
import React, {useState} from "react";
import './explore-page-style.css'
import {BoundingBox} from "../models/boundingBox";
import {LocationModel} from "../models/locationModel";
import {LocationExploreMarker} from "../components/map/markers/LocationExploreMarker";
import mockUtil from "../utils/mockUtil";
import {LocationExplorePopup} from "../components/map/popups/LocationExplorePopup";
import {PageProps} from "../props/pageProps";
import useAuth from "../hooks/useAuth";

export const ExplorePage: React.FC<PageProps> = () => {
    const mapboxAccessToken = process.env.REACT_APP_MAPBOX_KEY ?? ''
    const [locations, setLocations] = useState<LocationModel[]>([]);
    const [showPopup, setShowPopup] = useState(false)
    const [chosenLocation, setChosenLocation] = useState<LocationModel>()
    const {auth} = useAuth()

    const onBoundingBoxChanged = (bbox: BoundingBox): Promise<any> => {
        const mockLocations = mockUtil.generateMockLocations(bbox)
        setLocations(mockLocations)
        return new Promise(resolve => {});
    }

    const onMarkerChosen = (location: LocationModel) => {
       if (chosenLocation) {
           setShowPopup(false)
       }
        setShowPopup(true)
        setChosenLocation(location)
    }

    const createExploreMarker = (location: LocationModel) => {
        return (
            <LocationExploreMarker key={`${location.latitude}-${location.longitude}`}
                                   location={location}
                                   chosenHandler={onMarkerChosen}
            />
        )
    }

    const createLocationPopup = (location: LocationModel) => {
        return (
            <LocationExplorePopup location={location}
                                  closeHandler={onPopUpClose} />
        )
    }

    const onPopUpClose = () => {
        setShowPopup(false)
    }

    return (
        <div>
            <Navigation loggedIn={!!auth} />
            {
                auth ? (
                    <div className="full-screen-map">
                        <MapContainer accessToken={mapboxAccessToken}
                                      style={{height: '90vh'}}
                                      boundingBoxChangeHandler={onBoundingBoxChanged}
                        >
                            {
                                showPopup ? createLocationPopup(chosenLocation!) : (<div></div>)
                            }
                            {
                                locations.map(createExploreMarker)
                            }
                        </MapContainer>
                    </div>
                ): (
                    <div></div>
                )
            }

        </div>
    );
};