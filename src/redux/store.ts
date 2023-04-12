import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/authReducer'
import companyReducer from './reducers/companyReducer'
import ordersReducer from './reducers/ordersReducer'
// ...

const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
    company: companyReducer,
  },
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch