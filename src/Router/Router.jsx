import { createBrowserRouter } from "react-router";
import Home from "../Component/Home/Home";
import RootLayout from "../Layout/RootLayout";




const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [{
            index: true,
            element:<Home></Home>
        }]
    }
])

export default router;