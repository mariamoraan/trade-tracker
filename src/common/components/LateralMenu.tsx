import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { firebaseSignOut } from '../../auth/utils/auth';
import { useAppSelector } from '../../redux/hooks';
import { selectUserName } from '../../redux/reducers/authReducer';

const openMenu = keyframes`
 0% {transform: translateX(-100vw); opacity: 0;}
 100% {transform: translateX(0); opacity: 1;}
`

const closeMenuAnimation = keyframes`
 0% {transform: translateX(0); opacity: 1;}
 100% {transform: translateX(-100vw); opacity: 0.5;}
`

const Wrapper = styled.div<{isMenuOpen: boolean}>`
    padding: 24px;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 48px);
    width: calc(100vw - 48px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    background: var(--accent-color);
    color: var(--primary-color-light);
    z-index: 100;
    animation-name: ${props => props.isMenuOpen ? openMenu : closeMenuAnimation};
    animation-duration: 500ms;
    animation-iteration-count: 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
`

const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: flex-start;
    align-items: flex-start;
`

const Title = styled.h2``

const Button = styled.button`
    background: none;
    border: none;
    outline: none;
    color: var(--primary-color-light);
`

const ItemsWrapper = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 24px;
    flex: 1;
`

const BottomWrapper = styled.div`
    width: 100%;
`
const IconButton = styled(Link)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    color: var(--primary-color-light);
    gap: 12px;
    text-decoration: none;
`

const LogOutButton = styled.button`
    width: 100%;
    padding: 8px 12px;
    background: var(--primary-color-light);
    color: var(--accent-color);
    border: none;
    outline: 1px solid var(--primary-color-light);
    border-radius: 8px;
    font-weight: bold;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

type Props = {
    closeMenu: () => void,
    isMenuOpen: boolean
}


export const LateralMenu = ({closeMenu, isMenuOpen}: Props) => {
    const {t} = useTranslation()
    const userName = useAppSelector((state) => selectUserName(state.user))
    const items = [
        {icon: <DashboardIcon />, text:t("orders_panel"), link:"/orders-panel"},
        //{icon: <PersonIcon />, text: t("personal_area"), link:"/personal-area"},
        //{icon: <WorkspacesIcon />, text: t("company_panel"), link:"/company-info"},
        {icon: <SettingsIcon />, text: t("settings"), link: "/settings"}
    ]
    const logOut = async() => {
        await firebaseSignOut()
    }
    return (
        <Wrapper isMenuOpen={isMenuOpen}>
            <TopWrapper>
                <Button onClick={closeMenu}><CloseIcon /></Button>
                <Title>{t("greeting", {userName: userName})}</Title>
            </TopWrapper>
            <ItemsWrapper>
                {
                    items.map(({icon, text, link}) => (
                        <IconButton 
                        key={text}
                        to={link}
                        onClick={() => closeMenu()}
                        >
                            {icon}
                            {text}
                        </IconButton>
                    ))
                }
            </ItemsWrapper>
            <BottomWrapper>
                <LogOutButton onClick={() => logOut()}>{t("log_out")}</LogOutButton>
            </BottomWrapper>
        </Wrapper>
    )
}