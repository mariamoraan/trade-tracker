import styled from "styled-components";
import { ILabelAndInput } from "../types/IForm";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Label = styled.label`
    color: var(--secondary-color);
    font-weight: bold;
`

const Input = styled.input`
    padding: 8px;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    outline: none;
`

export const LabelAndInput = (props: ILabelAndInput) => {
    const {name, value, type, pattern, required, onChange, onClick, placeholder} = props.input
    return (
        <Wrapper>
            <Label htmlFor={name}>{props.label}</Label>
            <Input 
            value={value} 
            placeholder={placeholder}
            required={required} 
            type={type} 
            name={name} 
            pattern={pattern ? `${pattern}` : undefined} 
            onChange={onChange} 
            onClick={onClick}
            />
        </Wrapper>
    )
}