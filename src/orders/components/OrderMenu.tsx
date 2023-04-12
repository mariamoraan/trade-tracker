import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div<{isOpen: boolean}>`
    padding: 4px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: 500ms ease;
    transform-origin: top right;
    transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.2)'};
    z-index: ${props => props.isOpen ? 10 : -10};
    background: none;
`
const CloseIconWrapper = styled.button`
    max-width: fit-content;
    padding: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-end;
    border: none;
    outline: none;
    background: none;
    background: var(--primary-color-light);
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

const Button = styled.button`
    max-width: fit-content;
    padding: 4px 4px;
    min-width: 140px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    border: none;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    background: var(--primary-color-light);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

const Icon = styled.div<{color: string}>`
    color: ${props => props.color};
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid ${props => props.color};
    background: white;
    font-size: 12px;
`

const ButtonText = styled.p`
    font-size: 14px;
`

export const OrderMenu = ({isOpen, close, onDelete, onModify, onCopy}: {isOpen: boolean, close: () => void, onDelete: () => void, onModify:() => void, onCopy: () => void}) => {
    const {t} = useTranslation()
    return (
        <Wrapper isOpen={isOpen}>
            <CloseIconWrapper onClick={close}><CloseIcon /></CloseIconWrapper>
            <Button onClick={onDelete}><Icon color="#DF2E38"><DeleteIcon fontSize='inherit' /></Icon><ButtonText>{t('delete')}</ButtonText></Button>
            <Button onClick={onModify}><Icon color="#4E31AA"><AutoFixNormalIcon fontSize='inherit' /></Icon><ButtonText>{t('modify')}</ButtonText></Button>
            <Button onClick={onCopy}><Icon color="#2E4F4F"><ContentPasteIcon fontSize='inherit' /></Icon><ButtonText>{t('download')}</ButtonText></Button>
        </Wrapper>
    )
}