import { lazy } from "react";
import DistributorLayout from "../distrubutor/DistributorLayout";
import Loadable from "../components/Loadable";
import DeclarationContent from "../distrubutor/DeclarationContent";

const Dashboard = Loadable(lazy(() => import("../distrubutor/Dashboard")));
const MyReferrals = Loadable(lazy(() => import("../distrubutor/MyReferrals")));
const Genealogy = Loadable(lazy(() => import("../distrubutor/Genealogy")));
const DeclarationForm = Loadable(lazy(() => import("../distrubutor/DeclarationForm")));
const AddDistributor = Loadable(lazy(() => import("../distrubutor/AddDistributor")));
const WalletRequest = Loadable(lazy(() => import("../distrubutor/WalletRequest")));
const WalletRequests = Loadable(lazy(() => import("../distrubutor/WalletRequests")));
const IncomeWalletTransaction = Loadable(lazy(() => import("../distrubutor/IncomeWalletTransaction")));
const PurchaseWalletTransaction = Loadable(lazy(() => import("../distrubutor/PurchaseWalletTransaction")));
const PayoutTransaction = Loadable(lazy(() => import("../distrubutor/PayoutTransaction")));
const YourOrders = Loadable(lazy(() => import("../distrubutor/YourOrders")))
const Account = Loadable(lazy(() => import("../distrubutor/Account")))

const DistributorDashboardRoutes = {
    path: 'dashboard',
    element: <DistributorLayout />,
    children: [
        {
            path:'declaration-form',
            element:<DeclarationForm />
        },
        {
            path: '',
            element: <Dashboard />
        },
        {
            path: 'declaration',
            element: <DeclarationContent />
        },
        {
            path: 'my-referrals',
            element: <MyReferrals />
        },
        {
            path: 'genealogy/:id',
            element: <Genealogy />
        },
        {
            path: 'genealogy',
            element: <Genealogy />
        },
        {
            path: 'add-distributor/:parent/:placement',
            element: <AddDistributor />
        },
        {
            path: 'wallet-request',
            element: <WalletRequest />
        },
        {
            path: 'wallet-requests',
            element: <WalletRequests />
        },
        {
            path: 'transactions/income',
            element: <IncomeWalletTransaction />
        },
        {
            path: 'transactions/purchase',
            element: <PurchaseWalletTransaction />
        },
        {
            path: 'transactions/payout',
            element: <PayoutTransaction />
        },
        {
            path: 'your-orders',
            element: <YourOrders />
        },
        {
            path: 'account',
            element: <Account />
        }
    ]
}

export default DistributorDashboardRoutes
