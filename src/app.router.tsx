import { createBrowserRouter, Navigate} from "react-router";
import { ShopLayout } from "./shopFrontend/layout/ShopLayout";
import { HomePage } from "./shopFrontend/pages/home/HomePage";
import { ProductPage } from './shopFrontend/pages/product/ProductPage';
import { GenderPage } from './shopFrontend/pages/gender/GenderPage'
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { lazy } from "react";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";



const AuthLayout = lazy(() =>  import( "./auth/layouts/AuthLayout") )
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"))

export const appRouter  = createBrowserRouter([
//main routes
    {
        path: '/',
        element: <ShopLayout/>,
        children:[
           {
            index: true,
            element: <HomePage/>
           } ,
           {
            path: 'products/:idSdlug',
            element: <ProductPage/>
           },
           {
            path: 'gender/:gender',
            element : <GenderPage/>
           }
        ]
//Auth routes
    },{
        path: '/auth',
        element:(
        <NotAuthenticatedRoute>
            <AuthLayout/>
        </NotAuthenticatedRoute>
        ),
        children: [
            {
                //redirecciona cuando la pagina no existe
                index: true,
                element: <Navigate to='/auth/login' />
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    },
//admin routes
    {
        path: '/admin',
        element:(
        <AdminRoute>
            <AdminLayout/>
        </AdminRoute>),
        children:[
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path: 'products',
                element: <AdminProductsPage/>
            },
            {
                path: 'products/:id',
                element: <AdminProductPage/>
            },
        ],
    },
    {
        path:'*',
        element: <Navigate to='/'/>
    }
])