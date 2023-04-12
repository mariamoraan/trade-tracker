import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrder } from '../../orders/components/OrderMiniature'

interface IOrdersSlice {
    orders: IOrder[],
}

export const ordersSlice = createSlice({
  name: 'orders',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {orders: []},
  reducers: {
    updateOrders: (state: IOrdersSlice, action: PayloadAction<{orders: IOrder[]}>) => {
        state.orders = action.payload.orders
    }
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: IOrdersSlice): IOrder[] => state.orders

export default ordersSlice.reducer