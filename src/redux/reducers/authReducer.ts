import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser, OnboardStateType } from '../../auth/utils/user'

export interface IUserSlice {
    user: IUser | null,
}

export const userSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {user: null},
  reducers: {
    updateUser: (state: IUserSlice, action: PayloadAction<{user: IUser | null}>) => {
        state.user = action.payload.user
    }
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: IUserSlice): IUser | null => state.user
export const selectUserCompany = (state: IUserSlice): string | null => state.user?.company || null
export const selectUserOnboardStep = (state: IUserSlice): OnboardStateType | null => state.user?.onboardState || null
export const selectUserId = (state: IUserSlice): string | null => state.user?.id || null
export const selectUserName = (state:IUserSlice): string | null => state.user?.name || null

export default userSlice.reducer