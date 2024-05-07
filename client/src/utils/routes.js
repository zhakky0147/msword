import Login from "../pages/login";
import OTP from "../pages/otp";

export const ROUTES = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/verification",
    component: OTP,
  },
];
