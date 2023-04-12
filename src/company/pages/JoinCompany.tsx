import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { NEXT_STEP } from "../../auth/pages/SignUp";
import { firebaseSignOut } from "../../auth/utils/auth";
import { updateUser } from "../../auth/utils/user";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/reducers/authReducer";
import { getCompany, updateCompany } from "../utils/companiesManager";

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
    border: none;
    background: none;
    outline: none;
    color: var(--primary-color-light);
    margin-right: 24px;
`

const JoinCompany = () => {
    const [t] = useTranslation()
    const user = useAppSelector((state) => selectUser(state.user))
    const [companyCode, setCompanyCode] = useState("")
    const ref = useRef<HTMLFormElement | null>(null)

    const handleLogOut = async() => {
        await firebaseSignOut()
    }
    
    const handleSubmit = async(e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        if(!user) return
        const company = await getCompany(companyCode)
        if(!company) return
        await updateUser({...user, company: company.id, onboardState: NEXT_STEP.FINISHED})
        await updateCompany({...company, employees: [...company.employees, user.id]})
    } 
    return (
        <Wrapper>
            <BackButton onClick={() => handleLogOut()}><ArrowBackIcon /></BackButton>
            <Title>{t("introduce_company_code")}</Title>
            <Form 
            ref={ref}
            onSubmit={handleSubmit}
            >
            <Input 
            value={companyCode} 
            required={true} 
            type={"text"} 
            name={"company-code"} 
            onChange={(e) => setCompanyCode(e.target.value)} 
            />
            <Submit type="submit" value={t("continue") || "continue"} />
            </Form>
        </Wrapper>
    )
}

export default JoinCompany