import {Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRoad} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useEffect, useState} from "react";
import {StyleControlRadioProps} from "../../../props/styleControlRadioProps";

export const StyleControlRadio: React.FC<StyleControlRadioProps> = ({children, checkedHandler, optionName, chosen}) => {
    // const [checked, setChecked] = useState(chosen);

    const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        checkedHandler(optionName)
    }

    // useEffect(() => {}, [chosen])

    return (
        <Form.Check onClick={e => console.log(e)}
                    className={`style-radio ${chosen ? 'style-radio-selected' : ''}`}>
            <Form.Check.Input checked={chosen} onChange={onRadioChange} type={'radio'} name={'style'} />
            <Form.Check.Label className={'map-control'}>
                {children}
            </Form.Check.Label>
        </Form.Check>
    );
};