import styled from "styled-components";
import { ILabelAndInput } from "../types/IForm";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Label = styled.label`
    color: var(--secondary-color);
    font-weight: bold;
`

const Input = styled.textarea`
    padding: 8px;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    outline: none;
    resize: none;
`

export const TextArea = (props: ILabelAndInput) => {
    const {name, value, required, onChange, onClick} = props.input
    return (
        <Wrapper>
            <Label htmlFor={name}>{props.label}</Label>
            <Input 
            value={value} 
            required={required}  
            name={name} 
            onChange={onChange} 
            onClick={onClick}
            rows={10}
            />
        </Wrapper>
    )
}