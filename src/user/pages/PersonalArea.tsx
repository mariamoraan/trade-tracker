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

const PersonalArea = () => {
    const {t} = useTranslation()
    const userName = useAppSelector((state) => selectUserName(state.user))
    return (
        <Wrapper>
            <Title>{t("personal_area")}</Title>
            <Subtitle>{t("greeting", {userName: userName})}</Subtitle>
        </Wrapper>
    )
}

export default PersonalArea