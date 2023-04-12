import styled from "styled-components";
import { ILabelAndRadio } from "../types/IForm";

const Wrapper = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`

const Title = styled.p`
    margin-bottom: 12px;
    color: var(--secondary-color);
    font-weight: bold;
    font-size: 17px;
`

const InputWrapper = styled.div`
    padding: 12px;
    flex: 1;
    display: flex;
    gap: 12px;
    accent-color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 8px;
`
const Input = styled.input`
    vertical-align: middle;
    white-space: nowrap;
`
const Label = styled.label`
    vertical-align: middle;
    white-space: nowrap;
`


export const RadioInput = (props: ILabelAndRadio) => {
    const {radios, title} = props
    return (
        <div>
        <Title>{title}</Title>
        <Wrapper>
            {
                radios.map(({input, label}) => (
                    <InputWrapper 
                    key={`${input.name}-${input.value}`}
                    onClick={input.onClick}
                    >
                    <Input 
                    value={input.value} 
                    required={input.required} 
                    type={"radio"} 
                    name={input.name} 
                    pattern={input.pattern ? `${input.pattern}` : undefined} 
                    onChange={input.onClick} 
                    checked={input.checked}
                    />
                    <Label htmlFor={input.name}>{label}</Label>
                    </InputWrapper>
                ))
            }
        </Wrapper>
        </div>
    )
}