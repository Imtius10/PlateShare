import { createBrowserRouter } from "react-router";
import Home from "../Component/Home/Home";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AvailableFoods from "../Pages/AllFoods/AvailableFoods";
import FoodDetails from "../Pages/AllFoods/FoodDetails";
import ManageMyFoods from "../Pages/AllFoods/ManageMyFoods";




const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [{
            index: true,
            element:<Home></Home>
        },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/availabelfood',
                element: <AvailableFoods></AvailableFoods>
            },
            {
                path: '/foods/:id',
                element: <FoodDetails />
            }, {
                path: '/managefood',
                element: <ManageMyFoods></ManageMyFoods>
            }
        ]
    },
    
])

export default router;