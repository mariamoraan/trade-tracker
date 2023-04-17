import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { IUser, OnboardStateTypes, getUser, userSnapshot } from "./auth/utils/user";
import JoinCompany from "./company/pages/JoinCompany";
import NewCompany from "./company/pages/NewCompany";
import { getCompany } from "./company/utils/companiesManager";
import { firebaseAuthProvider } from "./firebase";
import './i18n';
import './index.css';
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectUserCompany, selectUserId, selectUserOnboardStep, userSlice } from "./redux/reducers/authReducer";
import { companySlice } from "./redux/reducers/companyReducer";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const App = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)
    const userId = useAppSelector((state) => selectUserId(state.user))
    const company = useAppSelector((state) => selectUserCompany(state.user))
    const nextStep = useAppSelector((state) => selectUserOnboardStep(state.user))

    const onUserChange = (user: IUser | null) => {
      dispatch(userSlice.actions.updateUser({user: user}))
    }
    
    useEffect(() => {
        onAuthStateChanged(firebaseAuthProvider, async(user) => {
            if (user) {
              const uid = user.uid;
              const userRes = await getUser(uid)
              dispatch(userSlice.actions.updateUser({user: userRes}))
              if(userRes?.company) {
                let companyRes = await getCompany(userRes.company)
                dispatch(companySlice.actions.setUpCompany({company: companyRes}))
              } else {
                dispatch(companySlice.actions.setUpCompany({company: null}))
              }
            } else {
              dispatch(userSlice.actions.updateUser({user: null}))
            }
          });
    }, [])

    useEffect(() => {
      if(userId === null) {
        onUserChange(null)
        return
      }
      userSnapshot(userId, onUserChange)
    }, [])

    if (user && !company &&  nextStep === OnboardStateTypes.CREATE_COMPANY) return <NewCompany />
    if (user && !company &&  nextStep === OnboardStateTypes.JOIN_COMPANY) return <JoinCompany />
    else if(user) return <AppRoutes />
    else return <AuthRoutes />
}

export default App