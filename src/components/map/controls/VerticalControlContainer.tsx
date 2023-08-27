import React from "react";
import '../map-container-style.css'
import {GenericProps} from "../../../props/genericProps";

export const VerticalControlContainer: React.FC<GenericProps> = ({children}) => {
    return (
        <div className={'vertical-button-container'}>
            {children}
        </div>
    );
};