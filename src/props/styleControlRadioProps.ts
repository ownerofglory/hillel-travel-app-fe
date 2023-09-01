export interface StyleControlRadioProps {
    children?: any[] | any
    checkedHandler: (name: string) => void
    optionName: string
    chosen: boolean
}