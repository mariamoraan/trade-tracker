import { ChangeEvent, FormEvent } from "react";

export type InputOnChangeElement = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export interface IInput {
    name: string,
    value: any,
    type: string,
    pattern?: string,
    checked?: boolean,
    required: boolean,
    placeholder?: string,
    onChange?: (e: InputOnChangeElement) => void,
    onClick?: () => void
}

export interface ILabelAndInput  {
    input: IInput,
    label: string,
    type: "label" | "textarea"
}

export interface ILabelAndRadio {
    radios: ILabelAndInput[],
    title: string,
    type: "radio"
}

export interface IForm {
    inputs: (ILabelAndInput | ILabelAndRadio)[],
    handleSubmit: (e: FormEvent<HTMLElement>) => void,
    submitText: string,
}