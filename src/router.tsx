import { createBrowserRouter } from 'react-router-dom';
import LazyImport from './LazyImport';
import Signup from './components/onboarding/signup';
import Verify from './components/onboarding/verify';
import ForgotPassword from './components/onboarding/forgetpassword';
import ResetPassword from './components/onboarding/resetpassword';
import BusinessInfo from './components/onboarding/signup/BusinessInfo';
import AdminSignupForm from './components/onboarding/signup/SignUpForm';
const LoginLoader = () => import('./components/onboarding/login');

const router = createBrowserRouter([
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
        children:[
            {
                path: '',
                element: <AdminSignupForm />,
            },
            {
                path: 'business-info',
                element:<BusinessInfo/>
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
        path: '/dashboard',

        children: [
            {
                path: ''
            }
        ]
    }
]);


export default router;
