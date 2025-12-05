import { createBrowserRouter } from "react-router";
import Home from "../Component/Home/Home";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";




const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [{
            index: true,
            element:<Home></Home>
        }]
    },
    {
        path: '/login',
        element:<Login></Login>
    }
])

export default router;