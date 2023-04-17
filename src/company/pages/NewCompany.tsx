import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { NEXT_STEP } from "../../auth/pages/SignUp";
import { firebaseSignOut } from "../../auth/utils/auth";
import { updateUser } from "../../auth/utils/user";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/reducers/authReducer";
import { addCompany } from "../utils/companiesManager";

const Wrapper = styled.div`
    padding: 24px;
    height: calc(${window.innerHeight}px - 48px);
    width: calc(100vw - 48px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    background: var(--accent-color);
    @media screen and (max-width: 1200px) {
        flex-direction: column;
        text-align: center;
    }
`

const Title = styled.h1`
    color: var(--primary-color-light);
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    @media screen and (max-width: 1200px) {
        flex-direction: column;
        gap: 24px;
        text-align: center;
    }
`

const Input = styled.input`
    padding: 6px 8px;
    outline: none;
    background: none;
    border: none;
    border-bottom: 2px solid var(--primary-color-light);
    color: var(--primary-color-light);
    font-weight: bold;
`

const Submit = styled.input`
    padding: 12px 24px;
    border-radius: 8px;
    outline: none;
    color: var(--accent-color);
    font-weight: bold;
    border: 1px solid var(--primary-color-light);
    cursor: pointer;
`

const BackButton = styled.button`
    padding: 12px;
    margin-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--primary-color-light);
    border: 1px solid var(--primary-color-light);
    border-radius: 100%;
    color: var(--accent-color);
    outline: none;
    @media screen and (max-width: 1200px) {
        margin-right: 0;
        margin-bottom: 24px;
    }
`

const NewCompany = () => {
    const [t] = useTranslation()
    const user = useAppSelector((state) => selectUser(state.user))
    const [companyName, setCompanyName] = useState("")
    const ref = useRef<HTMLFormElement | null>(null)
    const handleLogOut = async() => {
        await firebaseSignOut()
    }
    const handleSubmit = async(e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        if(!user) return
        const companyId = await addCompany({
            ownerId: user.id,
            name: companyName,
            employees: [user.id],
            id: user.id,
            ordersNumber: 0,
        })
        await updateUser({...user, company: companyId, onboardState: NEXT_STEP.FINISHED})
    } 
    return (
        <Wrapper>
            <BackButton onClick={() => handleLogOut()}><ArrowBackIcon /></BackButton>
            <Title>{t("write_your_company_name")}</Title>
            <Form 
            ref={ref}
            onSubmit={handleSubmit}
            >
            <Input 
            value={companyName} 
            required={true} 
            type={"text"} 
            name={"company-name"} 
            onChange={(e) => setCompanyName(e.target.value)} 
            />
            <Submit type="submit" value={t("continue") || "continue"} />
            </Form>
        </Wrapper>
    )
}

export default NewCompany