import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { updateCompany } from "../../company/utils/companiesManager"
import { useAppSelector } from "../../redux/hooks"
import { selectUserName } from "../../redux/reducers/authReducer"
import { selectCompany, selectCompanyMessage } from "../../redux/reducers/companyReducer"

const Wrapper = styled.div`

`
const Title = styled.h2``

const Subtitle = styled.p`
    color: var(--secondary-color);
`

const ElemWrapper = styled.div`
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const ElemTitle = styled.h3``

const LangButton = styled.button<{isActive: boolean}>`
    max-width: fit-content;
    color: ${props => props.isActive ? 'var(--accent-color)' : 'var(--primary-color)'};
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 14px;
    background: none;
`

const TextInput = styled.textarea`
    padding: 8px;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    outline: none;
    resize: none;
`

const DoneButton = styled.button`
    padding: 6px 12px;
    background: var(--accent-color-100);
    color: var(--accent-color);
    font-weight: bold;
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    outline: none;
`

const TagButtonsWrapper = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`

const TagButton = styled.button`
    padding: 4px 8px;
    width: fit-content;
    background: var(--accent-color-100);
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    font-weight: bold;
`

export const TagCodes = {
    price: "{{price}}",
    orderId: "{{order_id}}",
    orderDate: "{{order_date}}",
    clientName: "{{client_name}}",
    clientPhone: "{{client_phone}}",
    orderDescription: "{{order_description}}"
}

export type ITagCode = "{{price}}" | "{{order_id}}" | "{{order_date}}" | "{{client_name}}" | "{{client_phone}}" | "{{order_description}}"
export interface ITag {
    name: string,
    code: ITagCode
}

const Settings = () => {
    const {t, i18n} = useTranslation()
    const userName = useAppSelector((state) => selectUserName(state.user))
    const company = useAppSelector((state) => selectCompany(state.company))
    const companyMessage = useAppSelector((state) => selectCompanyMessage(state.company))
    const textAreaRef = useRef<HTMLTextAreaElement  | null>(null)
    const languages = [
        {code: 'es', name: t("spanish")},
        {code: 'en', name: t("english")},
    ]
    const [defaultMessage, setDefaultMessage] = useState(companyMessage)
    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode)
    }
    const tags: ITag[] = [
        {name: t("price"), code:"{{price}}"},
        {name: t("order_id"), code:"{{order_id}}"},
        {name: t("order_date"), code:"{{order_date}}"},
        {name: t("order_client_name"), code: "{{client_name}}"},
        {name: t("order_client_phone"), code: "{{client_phone}}"},
        {name: t("order_description"), code: "{{order_description}}"}
    ]

    const onTagIsClicked = (tag: ITag) => {
        var position = textAreaRef.current?.selectionEnd || defaultMessage.length;
        var output = [defaultMessage.slice(0, position), tag.code, defaultMessage.slice(position)].join('');
        setDefaultMessage(output)
    }

    const onSubmitText = async() => {
        if(!company) return
        await updateCompany({...company, companyMessage: defaultMessage})
    }

    return (
        <Wrapper>
            <Title>{t("settings")}</Title>
            <Subtitle>{t("greeting", {userName: userName})}</Subtitle>
            <ElemWrapper>
                <ElemTitle>{t("change_language")}</ElemTitle>
                {
                    languages.map((language) => (
                        <LangButton 
                        isActive={i18n.language === language.code}
                        onClick={() => changeLanguage(language.code)} 
                        key={language.code}
                        >
                            {language.name}
                        </LangButton>
                    ))
                }
            </ElemWrapper>
            <ElemWrapper>
                <ElemTitle>{t("change_default_message")}</ElemTitle>
                <TagButtonsWrapper>
                    {
                        tags.map((tag) => (
                            <TagButton
                            key={tag.code}
                            onClick={() => onTagIsClicked(tag)}
                            >
                                {tag.name}
                            </TagButton>
                        ))
                    }
                </TagButtonsWrapper>
                <TextInput 
                ref={textAreaRef}
                value={defaultMessage}  
                onChange={(e) => setDefaultMessage(e.target.value)} 
                rows={10}
                />
                <DoneButton onClick={() => onSubmitText()}>{t("update")}</DoneButton>
            </ElemWrapper>
        </Wrapper>
    )
}

export default Settings