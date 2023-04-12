import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../auth/pages/Login";
import Signup from "../auth/pages/SignUp";


const noAuthRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
        path: "*",
        element: <Signup />
    },
]);

const AuthRoutes = () => {
    return (
        <RouterProvider router={noAuthRouter} />
    )
} 


export default AuthRoutes