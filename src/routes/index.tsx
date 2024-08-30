import Login from '../pages/Authentication/Login';
import Delivery from '../pages/Delivery';
import Dashboard from '../pages/Dashboard';
import Device from '../pages/Device';
import Company from '../pages/Company';
import Unit from '../pages/Unit';
import Permissions from '../pages/Permission';
import Users from '../pages/Users';
import VerifyEmail from '../pages/Authentication/VerifyEmail';
import VerifyOtp from '../pages/Authentication/VerifyOtp';

//Public Routes
const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/verify-email', component: VerifyEmail },
  { path: '/otp', component: VerifyOtp },
  { path: '/password', component: VerifyOtp },
];

//Private Routes
const privateRoutes = [
  { path: '/', component: Dashboard },
  { path: '/company', component: Company },
  { path: '/delivery', component: Delivery },
  { path: '/device', component: Device },
  { path: '/unit', component: Unit },
  { path: '/users', component: Users },
  { path: '/permissions', component: Permissions },
];

export { publicRoutes, privateRoutes };
