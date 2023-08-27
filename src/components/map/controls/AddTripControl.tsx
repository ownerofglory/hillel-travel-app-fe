import { Button } from "react-bootstrap";
import {faMapLocationDot, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

export const AddTripControl = () => {
    const navigate = useNavigate()

    const openCreatePage = () => {
        navigate('/create-trip')
    }

    return (
        <div className={'add-trip-control'}>
            <Button variant="primary" onClick={e => openCreatePage()}>
                <FontAwesomeIcon icon={faPlus} style={{color: " #fcfcfc",}} />
                <FontAwesomeIcon icon={faMapLocationDot} style={{color: " #fcfcfc",}} />
            </Button>
        </div>
    );
};