import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useAppSelector } from "../../redux/hooks"
import { selectUserName } from "../../redux/reducers/authReducer"

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

const Settings = () => {
    const {t, i18n} = useTranslation()
    const userName = useAppSelector((state) => selectUserName(state.user))
    const languages = [
        {code: 'es', name: t("spanish")},
        {code: 'en', name: t("english")},
    ]
    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode)
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
        </Wrapper>
    )
}

export default Settings