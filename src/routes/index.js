import { useRoutes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import DistributorRoutes from './DistributorRoutes';
import DynamicRoutes from "./DynamicRoutes";
import ShopRoutes from "./ShopRoutes";

export default function ThemeRoutes() {
    return useRoutes([ShopRoutes, DynamicRoutes, AdminRoutes, DistributorRoutes]);
}
