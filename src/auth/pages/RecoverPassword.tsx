import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../../common/components/Form";
import { IForm, InputOnChangeElement } from "../../common/types/IForm";
import { firebaseSendResetPasswordEmail } from "../utils/auth";

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
    text-align: center;
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

const RecoverPasswordWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const RecoverPasswordButton = styled.button`
`


const RecoverPassword = () => {
    const [t] = useTranslation()
    const [login, setLogin] = useState<{email: string}>({email: ""})
    const handleSubmit = async(e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        await firebaseSendResetPasswordEmail(login.email)
        setLogin({email: ""})
    }
    const loginForm: IForm = {
        inputs: [
            {
                type: "label",
                input : {
                    name: "email",
                    value: login?.email,
                    type: "email",
                    required: true,
                    onChange: (e:  InputOnChangeElement) => setLogin({...login, email: e.target.value})
                },
                label: t("email")
            },
        ],
        handleSubmit: handleSubmit,
        submitText: t("recover_password"),
    }
    return (
        <Wrapper>
            <Title>{t("recover_password")}</Title>
            <Text>{t("dont_have_an_account")}<StyledLink to="/signup">{t("sign_up")}</StyledLink></Text>
            <Form {...loginForm} />
        </Wrapper>
    )
}

export default RecoverPassword