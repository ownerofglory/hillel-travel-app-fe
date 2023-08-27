import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationCrosshairs, faMagnifyingGlassPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {useMap} from "react-map-gl";

export const CurrentLocationControl = () => {
    const {current: map} = useMap()

    const onGetLocationSuccess = (position: GeolocationPosition) => {
        const {coords} = position
        map!.flyTo({center: [coords.longitude, coords.latitude] })
    }

    const onGetLocationError = (error: GeolocationPositionError) => {
        console.error('Unable to get current geo position', error)
    }

    const onGetCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError)
    }

    return (
        <Button className={'map-control'} variant="primary" onClick={e => onGetCurrentLocation()}>
            <FontAwesomeIcon icon={faLocationCrosshairs} style={{color: " #fcfcfc",}} />
        </Button>
    );
};