import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../../common/components/Form";
import { IForm, InputOnChangeElement } from "../../common/types/IForm";
import { firebaseSignUpWithEmailAndPassword } from "../utils/auth";
import { OnboardStateType, addUser } from "../utils/user";

const Wrapper = styled.div`
    padding: 12px 24px;
    min-height: calc(${window.innerHeight}px - 24px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Title = styled.h1`
    margin-bottom: 12px;
`

const Text = styled.p`
    margin-bottom: 24px;
`

const StyledLink = styled(Link)`
    padding: 0 4px;
    font-weight: bold;
    color: var(--accent-color);
    text-decoration: none;
`

export const NEXT_STEP: {[key: string]: OnboardStateType} = {
    CREATE_COMPANY: "CREATE_COMPANY",
    JOIN_COMPANY: "JOIN_COMPANY",
    FINISHED: "FINISHED"
}


const Signup = () => {
    const [t] = useTranslation()
    const [signup, setSignup] = useState<{name: string, email: string, password: string, nextStep: OnboardStateType}>({name: "", email: "", password: "", nextStep: NEXT_STEP.JOIN_COMPANY})

    const handleSubmit = async(e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        let id = await firebaseSignUpWithEmailAndPassword(signup.email, signup.password)
        if (id === null || id === undefined) return
        await addUser({
            id: id,
            name: signup.name,
            email: signup.email,
            onboardState: signup.nextStep
        })
        setSignup({name: "", email: "", password: "", nextStep: NEXT_STEP.JOIN_COMPANY})
    }

    const loginForm: IForm = {
        inputs: [
            {
                type: "label",
                input : {
                    name: "name",
                    value: signup?.name,
                    type: "name",
                    required: true,
                    onChange: (e:  InputOnChangeElement) => setSignup({...signup, name: e.target.value})
                },
                label: t("name")
            },
            {
                type: "label",
                input : {
                    name: "email",
                    value: signup?.email,
                    type: "email",
                    required: true,
                    onChange: (e:  InputOnChangeElement) => setSignup({...signup, email: e.target.value})
                },
                label: t("email")
            },
            {
                type: "label",
                input : {
                    name: "password",
                    value: signup?.password,
                    type: "password",
                    required: true,
                    onChange: (e:  InputOnChangeElement) => setSignup({...signup, password: e.target.value})
                },
                label: t("password")
            },
            {
                type: "radio",
                title: t("create_or_join"),
                radios: [
                    {
                        type: "label",
                        input : {
                            name: "nextStep",
                            value: NEXT_STEP.JOIN_COMPANY,
                            type: "radio",
                            required: true,
                            checked: signup.nextStep === NEXT_STEP.JOIN_COMPANY,
                            onClick: () => setSignup({...signup, nextStep: NEXT_STEP.JOIN_COMPANY}),
                        },
                        label: t("join_to_existing_company")
                    },
                    {
                        type: "label",
                        input : {
                            name: "nextStep",
                            value: NEXT_STEP.CREATE_COMPANY,
                            checked: signup.nextStep === NEXT_STEP.CREATE_COMPANY,
                            type: "radio",
                            required: true,
                            onClick: () => setSignup({...signup, nextStep: NEXT_STEP.CREATE_COMPANY})
                        },
                        label: t("create_new_company")
                    },
                ]
            }
        ],
        handleSubmit: handleSubmit,
        submitText: t("sign_up"),
    }

    return (
        <Wrapper>
            <Title>{t("sign_up")}</Title>
            <Text>{t("have_an_account")}<StyledLink to="/login">{t("log_in")}</StyledLink></Text>
            <Form {...loginForm} />
        </Wrapper>
    )
}

export default Signup