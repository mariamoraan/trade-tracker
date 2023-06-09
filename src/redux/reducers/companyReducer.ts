import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICompany } from '../../company/utils/companiesManager';

interface ICompanySlice {
    company: ICompany | null
}


export const companySlice = createSlice({
  name: 'company',
  initialState: {company: null},
  reducers: {
    setUpCompany: (state: ICompanySlice, action: PayloadAction<{company: ICompany | null}>) => {
        state.company = action.payload.company
    }
  },
})

export const selectCompany = (state: ICompanySlice): ICompany | null => state.company
export const selectCompanyId = (state: ICompanySlice): string  | null => state.company?.id || null
export const selectCompanyName = (state: ICompanySlice): string | null => state.company?.name || null
export const selectCompanyEmployees = (state: ICompanySlice): string[] | [] => state.company?.employees || []
export const selectCompanyOrdersNumber = (state: ICompanySlice): number => state.company?.ordersNumber || 0
export const selectCompanyMessage = (state: ICompanySlice): string => state.company?.companyMessage || ""

export default companySlice.reducer