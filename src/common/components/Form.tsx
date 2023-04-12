import styled from "styled-components";
import { IForm } from "../types/IForm";
import { LabelAndInput } from "./LabelAndInput";
import { RadioInput } from "./RadioInput";
import { TextArea } from "./Textarea";

const FormWrapper = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const SubmitButton = styled.input`  
    padding: 12px 24px;
    margin-top: 24px;
    width: min-content;
    width: 100%;
    display: block;
    flex-shrink: 1;
    flex-grow: 0;
    background: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    color: var(--primary-color-light);
    text-transform: uppercase;
    font-weight: bold;
`

export const Form = (props: IForm) => {
    const {inputs, handleSubmit, submitText} = props
    return (
        <FormWrapper onSubmit={handleSubmit}>
            {
                inputs.map((input) => {
                    if (input.type === 'radio') {
                        return <RadioInput key={input.title} {...input} />
                    } 
                    else if (input.type === 'textarea') {
                        return <TextArea key={input.input.name} {...input}  />
                    } 
                    else {
                        return <LabelAndInput key={input.input.name} {...input} />
                    }
                })
            }
            <SubmitButton type="submit" value={submitText} />
        </FormWrapper>
    )
}