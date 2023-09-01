import {GenericProps} from "./genericProps";

export interface StyleControlProps extends GenericProps {
    styleChangehandler: (style: string) => void
}