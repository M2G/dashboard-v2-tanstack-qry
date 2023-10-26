import type { JSX } from 'react';

import ROUTER_PATH from '@/constants/RouterPath';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Signin = lazy(() => import('@/containers/Signin'));
const Signup = lazy(() => import('@/containers/Signup'));
const ForgotPassword = lazy(() => import('@/containers/ForgotPassword'));
const ResetPassword = lazy(() => import('@/containers/ResetPassword'));

function PublicRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<ResetPassword />} path={ROUTER_PATH.RESET_PASSWORD} />
      <Route element={<ForgotPassword />} path={ROUTER_PATH.FORGOT_PASSWORD} />
      <Route element={<Signup />} path={ROUTER_PATH.SIGNUP} />
      <Route element={<Signin />} path={ROUTER_PATH.SIGNIN} />
      <Route element={<Navigate replace to={ROUTER_PATH.SIGNIN} />} path="*" />
    </Routes>
  );
}

export default PublicRoutes;
