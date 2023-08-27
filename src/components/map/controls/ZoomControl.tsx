import {useControl, useMap} from "react-map-gl";
import {Button} from "react-bootstrap";
import '../map-container-style.css'
import {faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ZOOM_STEP = 0.5

export const ZoomControl = () => {
    const {current: map} = useMap()

    const onZoomIn = () => {
        const currentZoom = map!.getZoom()
        if (currentZoom != map!.getMaxZoom()) {
            map!.setZoom(currentZoom + ZOOM_STEP)
        }
    }

    const onZoomOut = () => {
        const currentZoom = map!.getZoom()
        if (currentZoom != map!.getMinZoom()) {
            map!.setZoom(currentZoom - ZOOM_STEP)
        }
    }

    return (
        <div className={'zoom-buttons'}>
            <Button variant="primary" onClick={e => onZoomIn()}>
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} style={{color: " #fcfcfc",}} />
            </Button>
            <Button variant="primary" onClick={e => onZoomOut()}>
                <FontAwesomeIcon icon={faMagnifyingGlassMinus} style={{color: " #fcfcfc",}} />
            </Button>
        </div>
    );
};