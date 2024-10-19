import { createHashRouter } from 'react-router-dom';
import LazyImport from './LazyImport';
import Signup from './components/auth/signup';
import Verify from './components/auth/verify';
import ForgotPassword from './components/auth/forgetpassword';
import ResetPassword from './components/auth/resetpassword';
import BusinessInfo from './components/auth/signup/BusinessInfo';
import AdminSignupForm from './components/auth/signup/SignUpForm';
import Merchant from './components/pages';
import DashboardMain from './components/pages/dashboard';
import UploadCourse from './components/pages/dashboard/layout/Upload/UploadCourse';
import UploadEbook from './components/pages/dashboard/layout/Upload/UploadEbook';
import Overview from './components/pages/dashboard/layout/overview';
import Store from './components/pages/dashboard/layout/store';
import Order from './components/pages/dashboard/layout/order';
import Customer from './components/pages/dashboard/layout/customer';
import Transaction from './components/pages/dashboard/layout/transaction';
import ConfirmWithdrawal from './components/pages/ConfirmWithdrawals';


// eslint-disable-next-line react-refresh/only-export-components
const LoginLoader = () => import('./components/auth/login');



const router = createHashRouter([
    {
        path: '/',
        element: <LazyImport componentLoader={LoginLoader} />,
        loader: LoginLoader,
        children: [

        ]
    },
    {
        path: '/create-account',
        element: <Signup />,
        children: [
            {
                path: '',
                element: <AdminSignupForm />,
            },
            {
                path: '/create-account/business-info',
                element: <BusinessInfo />
            }
        ]
    },
    {
        path: '/verify-account',
        element: <Verify />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
    {
        path: '/merchant',
        element: <Merchant />,
        children: [
            {
                path: '/merchant',
                element: "Merchant"
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardMain />,
        children: [
            {
                path: '',
                element: <Overview/>
            },
            {
                path: '/dashboard/course',
                element: <UploadCourse />
            },
            {
                path: '/dashboard/ebook',
                element: <UploadEbook />
            },
            {
                path: '/dashboard/store',
                element: <Store />
            },
            {
                path: '/dashboard/order',
                element: <Order />
            },
            {
                path: '/dashboard/customer',
                element: <Customer />
            },
            {
                path: '/dashboard/transaction',
                element: <Transaction />
            },
        ]
    },
    {
        path: '/account-withdraw/:id',
        element: <ConfirmWithdrawal />
    },
]);


export default router;
