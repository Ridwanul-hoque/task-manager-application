import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import AddTask from "../pages/AddTask/AddTask";
import PrivateRoutes from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>

            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Registration></Registration>
            },
            {
                path: 'AddTasks',
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },
            {
                path: 'profile',
                element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
            },
        ]
    },
]);