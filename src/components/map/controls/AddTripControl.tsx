import { Button } from "react-bootstrap";
import {faMapLocationDot, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const AddTripControl = () => {
    return (
        <div className={'add-trip-control'}>
            <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} style={{color: " #fcfcfc",}} />
                <FontAwesomeIcon icon={faMapLocationDot} style={{color: " #fcfcfc",}} />
            </Button>
        </div>
    );
};