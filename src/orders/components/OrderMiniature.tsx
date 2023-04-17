import CheckIcon from '@mui/icons-material/Check';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

import { useAppSelector } from '../../redux/hooks';
import { selectCompanyMessage } from '../../redux/reducers/companyReducer';
import { TagCodes } from '../../user/pages/Settings';
import { dateToFormattedStringOrDay, stringToFormattedDate } from "../utils/dates";
import { deleteOrder } from '../utils/ordersManager';
import { EditableOrderMiniature } from './EditableOrderMiniature';
import { OrderMenu } from './OrderMenu';

interface IClient {
    name: string,
    phone: string,
    icon?: string,
}

export interface IOrder {
    id: string,
    isClosed: boolean,
    title: string,
    description: string,
    deliveryDate: string,
    client: IClient,
    price?: string,
    orderNumber: number,
}

const onAppear = keyframes`
 0% {transform: scale(0.6);}
 100% {opacity: scale(1);}
`

const Wrapper = styled.div<{hasNormalOpacity: boolean}>`
    position: relative;
    background: var(--primary-color-light);
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transform-origin: center left;
    animation-name: ${onAppear};
    animation-duration: 500ms;
    opacity: ${props => props.hasNormalOpacity ? '1' : '0.6'};
    transition: 500ms ease;
`

const MenuWrapper = styled.div`
    padding: 12px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    background: var(--accent-color);
    color: var(--primary-color-light);
    border-radius: 8px 8px 0 0;
    font-weight: bold;
`

const MenuButton = styled.button<{isVisible: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--primary-color-light);
    visibility: ${props => props.isVisible ? 'visible' : 'hidden'}
`

const TopWrapper = styled.div`
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    border-bottom: 1px solid var(--secondary-color-100);
    overflow-wrap: break-word; 
    overflow: hidden;
`

const BottomWrapper = styled.div`
    padding: 12px;
    padding-top: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
`

const TopSideWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`

const PriceWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
`

const Price = styled.p`
    padding: 2px 6px;
    background: var(--primary-color-light);
    color: var(--accent-color);
    border: 1px solid  var(--accent-color);
    border-radius: 10px;
    font-size: 14px;
`

const DeliveryButton = styled.button<{isClosed: boolean}>`
    padding: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--secondary-color);
    border-radius: 100%;
    color: ${props => props.isClosed ? 'var(--primary-color-light)' : 'black'};
    background: ${props => props.isClosed ? 'var(--accent-color)' : 'white'};
    transition: 200ms ease;
`

const Title = styled.p`
    font-size: 1rem;
    font-weight: bold;
    flex: 1;
`
const Description = styled.p`
    color: var(--secondary-color);
    font-size: 0.9rem;
    white-space: pre-wrap;
`
const Text = styled.p`
    font-size: 0.8rem;
`

const Date = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`

const ClientButton = styled.button`
    padding: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: none;
    outline: none;
    color: white;
    text-transform: uppercase;
    background: var(--accent-color);
`
const ClientData = styled.p`
    font-size: 0.8rem;
    color: var(--secondary-color);
`

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    color: var(--secondary-color);
`

type Props = {
    order: IOrder,
    onClick: (id: string) => void,
    appliedFilter: string
}

type VisualModeProps = {
    order: IOrder,
    onClick: (id: string) => void,
    openEditMode: () => void,
    appliedFilter: string,
}

const OrderMiniatureVisual = (props: VisualModeProps) => {
    const {t, i18n} = useTranslation()
    const {description, deliveryDate, isClosed, client, id, price, orderNumber} = props.order
    const companyMessage = useAppSelector((state) => selectCompanyMessage(state.company))
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const onCopy = () => {
        let date = t(stringToFormattedDate(deliveryDate, i18n.language))
        let text = companyMessage
        text = text.replaceAll(TagCodes.price, price || '')
        text = text.replaceAll(TagCodes.clientName, client.name)
        text = text.replaceAll(TagCodes.clientPhone, client.phone)
        text = text.replaceAll(TagCodes.orderId, `#${orderNumber}`)
        text = text.replaceAll(TagCodes.orderDate, date)
        text = text.replaceAll(TagCodes.orderDescription, description)
        navigator.clipboard.writeText(text)
        setIsMenuOpen(false)
    }
    return (
        <Wrapper hasNormalOpacity={!(isClosed)}>
            <OrderMenu 
            isOpen={isMenuOpen} 
            close={() => {setIsMenuOpen(false)}} 
            onDelete ={() => {deleteOrder(id)}}
            onModify={() => props.openEditMode()}
            onCopy={onCopy}
            />
            <MenuWrapper>
                <Date>
                    <Text>{dateToFormattedStringOrDay(deliveryDate, i18n.language)}</Text>
                </Date>
                <MenuButton 
                isVisible={!isMenuOpen}
                onClick={() => {setIsMenuOpen(true)}} 
                >
                    <MoreHorizIcon />
                </MenuButton>
            </MenuWrapper>
            <TopWrapper>
                {
                price 
                ? <PriceWrapper><Text>{t('total')}:</Text><Price>{price}</Price> </PriceWrapper>
                : null
                }
                <TopSideWrapper>
                    <Title>#{orderNumber}</Title>
                    <DeliveryButton 
                    onClick={() => props.onClick(id)} 
                    isClosed={isClosed}>
                        {isClosed ? <CheckIcon /> : null}
                    </DeliveryButton>
                </TopSideWrapper>
                <Description>{description}</Description>
            </TopWrapper>
            <BottomWrapper>
                <ClientButton>{client.name[0]}</ClientButton>
                <ClientData>{client.name}</ClientData>
                <IconWrapper><FiberManualRecordIcon fontSize={'inherit'} /></IconWrapper>
                <ClientData>{client.phone}</ClientData>
            </BottomWrapper>
        </Wrapper>
    )
}


export const OrderMiniature = (props: Props) => {
    const [isModifying, setIsModifying] = useState(false)
    return isModifying 
    ? <EditableOrderMiniature 
        order={props.order}
        onClick={props.onClick}
        closeEditMode={() => setIsModifying(false)}
    /> 
    : <OrderMiniatureVisual  
        order={props.order}
        onClick={props.onClick}
        openEditMode={() => setIsModifying(true)}
        appliedFilter={props.appliedFilter}
        />
}