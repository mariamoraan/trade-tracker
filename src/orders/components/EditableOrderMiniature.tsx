import { useState } from 'react';
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { updateOrder } from '../utils/ordersManager';
import { IOrder } from './OrderMiniature';

interface IClient {
    name: string,
    phone: string,
    icon?: string,
}

const Wrapper = styled.div`
    position: relative;
    background: var(--primary-color-light);
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const MenuWrapper = styled.div`
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    background: var(--accent-color);
    color: var(--primary-color-light);
    border-radius: 8px 8px 0 0;
    font-weight: bold;
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
    gap: 8px;
    flex-wrap: wrap;
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

const Price = styled.input`
    margin: 0;
    padding: 2px 6px;
    background: var(--primary-color-light);
    color: var(--accent-color);
    border: 1px solid  var(--accent-color);
    border-radius: 10px;
    font-size: 14px;
`

const Title = styled.p`
    font-size: 1rem;
    font-weight: bold;
    flex: 1;
    border: none;
`
const Description = styled.textarea`
    padding: 8px;
    width: calc(100% - 16px);
    height: auto;
    resize: none;
    color: var(--secondary-color);
    font-size: 0.9rem;
    white-space: pre-wrap;
`

const Text = styled.p`
    font-size: 0.8rem;
`

const TextInput = styled.input`
    font-size: 0.8rem;
    border: none;
    border-bottom: 1px solid white;
`

const Date = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`

const ClientData = styled.input`
    font-size: 0.8rem;
    color: var(--secondary-color);
    border: none;
    border-bottom: 1px solid black;
`

const BottomButtonsWrapper = styled.div`
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const UpdateButton = styled.button`
    padding: 6px 12px;
    background: var(--accent-color-100);
    color: var(--accent-color);
    font-weight: bold;
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    outline: none;
`

const CancelButton = styled.button`
    padding: 6px 12px;
    background: var(--primary-color-light);
    color: #DF2E38;
    font-weight: bold;
    border: 1px solid #DF2E38;
    border-radius: 8px;
    outline: none;
`

type EditModeProps = {
    order: IOrder,
    onClick: (id: string) => void,
    closeEditMode: () => void,
}


export const EditableOrderMiniature = (props: EditModeProps) => {
    const {t, i18n} = useTranslation()
    const {title, description, deliveryDate, isClosed, client, id, price, orderNumber} = props.order
    const [order, setOrder] = useState<IOrder>({
        id: id,
        isClosed: isClosed,
        title: title,
        description: description,
        deliveryDate: deliveryDate,
        client: client,
        price: price,
        orderNumber: orderNumber
    })
    const onFinish = async() => {
        await updateOrder(order)
        props.closeEditMode()
    }

    return (
        <Wrapper>
            <MenuWrapper>
                <Date>
                    <TextInput 
                    type="date"
                    value={order.deliveryDate} 
                    onChange={(e) => setOrder(prev => ({...prev, deliveryDate: e.target.value}))}
                    />
                </Date>
            </MenuWrapper>
            <TopWrapper>
                <PriceWrapper>
                    <Text>{t("total")}:</Text>
                    <Price 
                    value={order.price || ''} 
                    onChange={(e) => setOrder(prev => ({...prev, price: e.target.value}))} 
                    placeholder={t("placeholder_price") || '24.99€'}
                    />
                </PriceWrapper>
                <TopSideWrapper>
                    <Title>#{order.orderNumber}</Title>
                </TopSideWrapper>
                <Description rows={10} value={order.description} onChange={(e) => setOrder(prev => ({...prev, description: e.target.value}))}  />
            </TopWrapper>
            <BottomWrapper>
                <ClientData type="text" value={order.client.name} onChange={(e) => setOrder(prev => ({...prev, client: {...prev.client, name: e.target.value}}))} />
                <ClientData type="text" value={order.client.phone} onChange={(e) => setOrder(prev => ({...prev, client: {...prev.client, phone: e.target.value}}))} />
            </BottomWrapper>
            <BottomButtonsWrapper>
                <UpdateButton onClick={() => onFinish()}>{t('update')}</UpdateButton>
                <CancelButton onClick={() => props.closeEditMode()}>{t('cancel')}</CancelButton>
            </BottomButtonsWrapper>
        </Wrapper>
    )
}