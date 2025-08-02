import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { isOrgUser } from "../auth/AuthProvider";
import Loadable from "../components/Loadable";
import menuItems from './menu-items';

const MainLayout = Loadable(lazy(() => import("../layout/MainLayout")));

const AdminLayout = () => {
    return isOrgUser() ? (
        <MainLayout menuItems={menuItems} />
    ) : (
        <Navigate to="/login" />
    )
}

export default AdminLayout