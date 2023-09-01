import {faMountainCity, faRoad, faSatellite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Form} from "react-bootstrap";
import {useMap} from "react-map-gl";
import {StyleControlRadio} from "./StyleControlRadio";
import {useState} from "react";
import { StyleControlProps } from "../../../props/styleControlProps";

export const StyleControl: React.FC<StyleControlProps> = ({styleChangehandler}) => {
    const {current: map} = useMap()
    const [chosenName, setChosenName] = useState('outdoors')

    const onStyleChosen = (name: string) => {
        setChosenName(name)

        switch (name) {
            case 'street':
                styleChangehandler('mapbox://styles/mapbox/streets-v12')
                break
            case 'outdoors':
                styleChangehandler('mapbox://styles/mapbox/outdoors-v12')
                break
            case 'satellite':
                styleChangehandler('mapbox://styles/mapbox/satellite-v9')
                break
        }
    }

    return (
        <div className={'style-checkbox'}>
            <Form>
                <StyleControlRadio optionName={'street'} chosen={chosenName === 'street'} checkedHandler={onStyleChosen}>
                    <FontAwesomeIcon style={{color: '#0a58ca'}} icon={faRoad} />
                </StyleControlRadio>

                <StyleControlRadio optionName={'outdoors'} chosen={chosenName === 'outdoors'} checkedHandler={onStyleChosen}>
                    <FontAwesomeIcon style={{color: '#0a58ca'}} icon={faMountainCity} />
                </StyleControlRadio>

                <StyleControlRadio optionName={'satellite'} chosen={chosenName === 'satellite'} checkedHandler={onStyleChosen}>
                    <FontAwesomeIcon style={{color: '#0a58ca'}} icon={faSatellite} />
                </StyleControlRadio>
            </Form>
        </div>
    );
};