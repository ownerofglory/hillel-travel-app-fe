import {GenericProps} from "./genericProps";

export interface StyleControlRadioProps extends GenericProps {
    checkedHandler: (name: string) => void
    optionName: string
    chosen: boolean
}