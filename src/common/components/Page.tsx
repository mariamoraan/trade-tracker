import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import styled from "styled-components";
import { LateralMenu } from './LateralMenu';

const Wrapper = styled.div`
    position: relative;
    padding: 24px;
    height: ${window.innerHeight - 48}px;
    display: flex;
    flex-direction: column;
    background: var(--secondary-color-100);
    overflow: hidden;
`
const Menu = styled.div``

const MenuButton = styled.button`
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`

export const Page = ({children}: {children: JSX.Element}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Wrapper>
            <LateralMenu 
            closeMenu={() => setIsMenuOpen(false)} 
            isMenuOpen={isMenuOpen}
            />
            <Menu>
            <MenuButton onClick={() => setIsMenuOpen(true)}><MenuIcon /></MenuButton>
            </Menu>
            {children}
        </Wrapper>
    )
}