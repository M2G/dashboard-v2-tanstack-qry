import type { JSX } from 'react';

import ROUTER_PATH from '@/constants/RouterPath';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar';

const Home = lazy(() => import('@/containers/Home'));
const Users = lazy(() => import('@/containers/Users'));
const ChangePassword = lazy(() => import('@/containers/ChangePassword'));
const Profil = lazy(() => import('@/containers/Profil'));
const Concerts = lazy(() => import('@/containers/Concerts'));

function PrivateRoutes(): JSX.Element {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route element={<Home />} path={ROUTER_PATH.HOME} />
        <Route element={<Users />} path={ROUTER_PATH.USERS} />
        <Route element={<Profil />} path={ROUTER_PATH.PROFIL} />
        <Route element={<ChangePassword />} path={ROUTER_PATH.CHANGE_PASSWORD} />
        <Route element={<Concerts />} path={ROUTER_PATH.CONCERTS} />
        <Route element={<Navigate replace to={ROUTER_PATH.HOME} />} path="*" />
      </Routes>
    </>
  );
}

export default PrivateRoutes;
