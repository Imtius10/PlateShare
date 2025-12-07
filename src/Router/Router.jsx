import { createBrowserRouter } from "react-router";
import Home from "../Component/Home/Home";
import RootLayout from "../Layout/RootLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AvailableFoods from "../Pages/AllFoods/AvailableFoods";
import FoodDetails from "../Pages/AllFoods/FoodDetails";
import ManageMyFoods from "../Pages/AllFoods/ManageMyFoods";
import AddFoods from "../Pages/AllFoods/AddFoods";
import FoodRequest from "../Pages/AllFoods/FoodRequest";
import MyRequest from "../Pages/AllFoods/MyRequest";
import FoodOwnerRequestPanel from "../Pages/AllFoods/FoodOwnerRequestPanel";
import OwnerRequests from "../Pages/AllFoods/OwnerRequests";
import UpdateFood from "../Pages/AllFoods/UpdateFood";
import PrivateRoutes from "../Private/PrivateRoutes";
import ErrorPage from "../Pages/Error/ErrorPage";




const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        errorElement:<ErrorPage></ErrorPage>,
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
                element: <PrivateRoutes>
                    <FoodDetails />
                </PrivateRoutes>
            }, {
                path: '/managefood',
                element: <ManageMyFoods></ManageMyFoods>
            },
            {
                path: '/addfoods',
                element:<AddFoods></AddFoods>
                
            },
            {
                path: "/food-request/:ownerEmail",
                element: <FoodRequest />
            },

            {
                path: '/myrequest',
                element:<MyRequest></MyRequest>
            },
            {
                path: "/food-request",
                element: <FoodOwnerRequestPanel />
            },
            {
                path:"/owner-requests",
                element:< OwnerRequests />
            },
            {
                path: "/update-food/:id",
                element:<UpdateFood></UpdateFood>
            }
        ]
    },
    
])

export default router;