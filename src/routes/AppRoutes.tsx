import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IUser } from "../auth/utils/user";
import { Page } from "../common/components/Page";
import CompanyInfo from "../company/pages/CompanyInfo";
import { IOrder } from "../orders/components/OrderMiniature";
import OrdersPanel from "../orders/pages/OrdersPanel";
import { ordersSnapshot } from "../orders/utils/ordersManager";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUserCompany } from "../redux/reducers/authReducer";
import { ordersSlice } from "../redux/reducers/ordersReducer";
import PersonalArea from "../user/pages/PersonalArea";
import Settings from "../user/pages/Settings";

const authRouter = createBrowserRouter([
    {
      path: "/orders-panel",
      element: <Page><OrdersPanel /></Page>
    },
    {
      path: "/company-info",
      element: <Page><CompanyInfo /></Page>
    },
    {
      path: "/personal-area",
      element: <Page><PersonalArea /></Page>
    },
    {
      path: "/settings",
      element: <Page><Settings /></Page>
    },
    {
        path: "*",
        element: <Page><OrdersPanel /></Page>
    }
]);

const AppRoutes = () => {
  const user: IUser | null = useAppSelector((state) => state.user.user)
  const userCompany: string | null = useAppSelector((state) => selectUserCompany(state.user))
  const dispatch = useAppDispatch()
  const onOrdersChange = (orders: IOrder[]) => {
      dispatch(ordersSlice.actions.updateOrders({orders: orders}))
  }
  useEffect(() => {
    const asyncUpdateUser = async() => {
      if(user === null || userCompany === null) return
      ordersSnapshot(userCompany, onOrdersChange)
    }
    asyncUpdateUser()
  }, [userCompany])
  
  if(userCompany) {
    return <RouterProvider router={authRouter} />
  } 
  else {
    return <h1>Heyy</h1>
  }
}

export default AppRoutes