import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { Form } from "../../common/components/Form";
import { IForm, InputOnChangeElement } from "../../common/types/IForm";
import { useAppSelector } from '../../redux/hooks';
import { selectUserCompany } from '../../redux/reducers/authReducer';
import { selectCompanyName } from '../../redux/reducers/companyReducer';
import { Filter } from "../components/Filter";
import { IOrder, OrderMiniature } from "../components/OrderMiniature";
import { dateToFormattedStringOrDay } from '../utils/dates';
import { addOrder, updateOrder } from "../utils/ordersManager";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background: var(--secondary-color-100);
    overflow: hidden;
`
const TopMenu = styled.div`
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
`

const DaySelector = styled.div`
    flex: 1;
`

const Title = styled.h2``

const Subtitle = styled.p`
    color: var(--secondary-color);
`

const AddButton = styled.button<{hasClick: boolean}>`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--accent-color-100);
    color: var(--accent-color);
    border: 1px solid var(--accent-color);
    border-radius: 100%;
    font-weight: bold;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    text-wrap: no-wrap;
    transition: 500ms ease;
    transform: ${props => props.hasClick ? 'rotate(180deg)' : 'rotate(0)'};
`

const FilterMenu = styled.div`
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
`

const OrdersList = styled.div`
    padding-bottom: 8px;
    padding-right: 8px;
    margin-bottom: 12px;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px;
    height: 100%;
    overflow-y: auto;
`

const DayAndOrder = styled.div``

const onAppear = keyframes`
 0% {transform: scale(0.6);}
 100% {opacity: scale(1);}
`

const DayText = styled.h2`
    margin-bottom: 12px;
    font-size: 0.8rem;
    text-transform: uppercase;
    transform-origin: center left;
    animation-name: ${onAppear};
    animation-duration: 500ms;
`

const BottomMenu = styled.div<{isMenuOpen: boolean}>`
    padding: 24px;
    position: absolute;
    left: 0;
    bottom: ${props => props.isMenuOpen ? '0' : '-100%'};
    min-height: 50vh;
    max-height: 80vh;
    overflow-y: auto;
    width: calc(100% - 48px);
    border-radius: 24px 24px 0 0;
    background: var(--primary-color-light);
    transition: 500ms ease;
`

const BottomMenuTitle = styled.p`
    margin: 12px 0 24px 0;
    font-size: 22px;
    font-weight: bold;
    color: var(--accent-color);
`
export const FILTERS = {
    OPENED: "OPENED",
    CLOSED: "CLOSED",
    ALL: "ALL",
}

const initialState: IOrder = {
    id: "default_id",
    isClosed: false,
    title: "",
    description: "",
    deliveryDate: "",
    client: {name: "", phone: ""},
    price: '',
    orderNumber: 0,
}


const OrdersPanel = () => {
    const {t, i18n} = useTranslation()
    const userCompany: string | null = useAppSelector((state) => selectUserCompany(state.user))
    const companyName: string | null = useAppSelector((state) => selectCompanyName(state.company))
    const [currentFilter, setCurrentFilter] = useState(FILTERS.OPENED)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [orderForm, setOrderForm] = useState<IOrder>(initialState)

    const handleClickOrder = (id: string) => {
        let order: IOrder | undefined = orders.find((order: IOrder) => order.id === id)
        if (order === undefined) return
        updateOrder({ ...order, isClosed: !order.isClosed })
    }

    const orders: IOrder[] = useAppSelector((state) => state.orders.orders)
    let currentDate = ''

    const FILTER_AMOUNT = {
        [FILTERS.ALL]: orders.length,
        [FILTERS.OPENED]: orders.filter((order) => !order.isClosed).length,
        [FILTERS.CLOSED]: orders.filter((order) => order.isClosed).length,
    }

    const filterOrder = (order: IOrder) => {
        switch(currentFilter) {
            case FILTERS.ALL:
                return true
            case FILTERS.OPENED:
                return !order.isClosed
            case FILTERS.CLOSED:
                return order.isClosed
            default:
                return true
        }
    }

    const handleCreateOrder = async(e: FormEvent) => {
        e.preventDefault()
        if(!userCompany) {
            console.log("Error adding order to company")
            return
        }
        await addOrder(orderForm, userCompany)
        setOrderForm(initialState)
        setIsMenuOpen(false)
    }

    const form: IForm = {
        inputs: [
            {
                label: t("order_description"),
                type: "textarea",
                input: {
                    name: "description",
                    value: orderForm.description,
                    type: "textarea",
                    required: true,
                    onChange: (e: InputOnChangeElement) => setOrderForm(prev => ({...prev, description: e.target.value})),
                }
            },
            {
                label: t("order_date"),
                type: "label",
                input: {
                    name: "date",
                    value: orderForm.deliveryDate,
                    type: "date",
                    required: true,
                    onChange: (e: InputOnChangeElement) => setOrderForm(prev => ({...prev, deliveryDate: e.target.value})),
                }
            },
            {
                label: t("price"),
                type: "label",
                input: {
                    name: "price",
                    value: orderForm.price,
                    type: "text",
                    required: false,
                    onChange: (e: InputOnChangeElement) => setOrderForm(prev => ({...prev, price: e.target.value})),
                    placeholder: t("placeholder_price") || '24.99€',
                }
            },
            {
                label:  t("order_client_name"),
                type: "label",
                input: {
                    name: "clientName",
                    value: orderForm.client.name,
                    type: "text",
                    required: true,
                    onChange: (e: InputOnChangeElement) => setOrderForm(prev => ({...prev, client: {...prev.client, name: e.target.value}})),
                }
            },
            {
                label: t("order_client_phone"),
                type: "label",
                input: {
                    name: "clientPhone",
                    value: orderForm.client.phone,
                    type: "tel",
                    required: true,
                    onChange: (e: InputOnChangeElement) => setOrderForm(prev => ({...prev, client: {...prev.client, phone: e.target.value}})),
                    placeholder: '695735105',
                }
            },
        ],
        handleSubmit: handleCreateOrder,
        submitText: "Submit"
    }
    return (
        <Wrapper>
            <TopMenu>
                <DaySelector>
                    <Title>{t("orders")}</Title>
                    <Subtitle>{companyName}</Subtitle>
                </DaySelector>
                <AddButton 
                hasClick={isMenuOpen}
                onClick={() => setIsMenuOpen(prev => !prev)}>
                    <AddIcon />
                </AddButton>
            </TopMenu>
            <FilterMenu>
                {
                    Object.values(FILTERS).map((filter) => (
                        <Filter
                            key={filter}
                            text={t(filter)}
                            isActive={currentFilter === filter} 
                            onClick={() => setCurrentFilter(filter)}
                            itemsNumber={FILTER_AMOUNT[filter]}
                        />
                    ))
                }
            </FilterMenu>
            <OrdersList>
                {
                    orders.filter((order: IOrder) => filterOrder(order)).map((order: IOrder, index) => 
                    {
                        if (index === 0 || currentDate !== order.deliveryDate) {
                            currentDate = order.deliveryDate
                            return (
                                <DayAndOrder key={`${order.id}-${currentFilter}`}> 
                                    <DayText>{dateToFormattedStringOrDay(order.deliveryDate, i18n.language)}</DayText>
                                    <OrderMiniature 
                                    order={order} 
                                    onClick={handleClickOrder} 
                                    appliedFilter={currentFilter}  
                                    />
                                </DayAndOrder>
                            )
                        }
                        else {
                            return <OrderMiniature 
                            key={`${order.id}-${currentFilter}`} 
                            order={order} 
                            onClick={handleClickOrder} 
                            appliedFilter={currentFilter} 
                            />
                        }
                    }
                    )
                }
            </OrdersList>
            <BottomMenu isMenuOpen={isMenuOpen}>
                <KeyboardArrowDownIcon onClick={() => setIsMenuOpen(false)} />
                <BottomMenuTitle>New Order</BottomMenuTitle>
                <Form {...form} />
            </BottomMenu>
        </Wrapper>
    )
}

export default OrdersPanel