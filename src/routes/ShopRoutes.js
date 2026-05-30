import { lazy } from "react";
import Loadable from "../components/Loadable";


const ShopHome = Loadable(lazy(() => import("../shop/ShopHome")));
const ShopDetails = Loadable(lazy(() => import("../shop/ShopDetails")));
const ShopList = Loadable(lazy(() => import('../shop/ShopList')))
const ComboListing = Loadable(lazy(() => import("../shop/ComboListing")))
const ComboDetails = Loadable(lazy(() => import("../shop/ComboDetails")))
const ShopLayout = Loadable(lazy(() => import('../shop/ShopLayout')))
const Cart = Loadable(lazy(() => import('../shop/Cart')))
const Address = Loadable(lazy(() => import('../shop/Address')))
const AddAddress = Loadable(lazy(() => import('../shop/AddAddress')))
const Checkout = Loadable(lazy(() => import("../shop/Checkout")))
const Shipping = Loadable(lazy(() => import("../shop/Shipping")))
const PrivacyPolicy = Loadable(lazy(() => import("../shop/PrivacyPolicy")))
const TermsOfService = Loadable(lazy(() => import("../shop/TermsOfService")))
const Products = Loadable(lazy(() => import("../shop/Products")))
const CommonlyUsedTerms = Loadable(lazy(() => import("../shop/CommonlyUsedTerms")))
const ComphensationPlan = Loadable(lazy(() => import("../shop/ComphensationPlan")))
const Transactions = Loadable(lazy(() => import("../shop/Transactions")))
const RightsandDuties = Loadable(lazy(() => import("../shop/RightsandDuties")))
const BusinessInformationKit = Loadable(lazy(() => import("../shop/BusinessInformationKit")))
const Termination = Loadable(lazy(() => import("../shop/Termination")))
const LegalDocuments =Loadable(lazy(() =>import("../shop/LegalDocuments")))
const BrandShaara = Loadable(lazy(() => import("../shop/BrandShaara")))

const ShopRoutes = {
    path: '',
    element: <ShopLayout />,
    children: [
        {
            path: '/',
            element: <ShopHome />
        },
        {
            path: '/shop',
            element: <ShopList />
        },
        {
            path: '/c/:id/*',
            element: <ShopList />
        },
        {
            path: '/p/:id/*',
            element: <ShopDetails />
        },
        {
            path: '/cb/:id/*',
            element: <ComboListing />
        },
        {
            path: '/cd/:id/*',
            element: <ComboDetails />
        },
        {
            path: '/cart',
            element: <Cart />
        },
        {
            path: '/address',
            element: <Address />
        },
        {
            path: '/add-address',
            element: <AddAddress />
        },
        {
            path: '/checkout',
            element: <Checkout />
        },
        {
            path: '/comphensation-plan',
            element: <ComphensationPlan />
        },
        {
            path: '/products',
            element: <Products />
        },
        {
            path: '/transactions',
            element: <Transactions />
        },
        {
            path: '/rights-and-duties',
            element: <RightsandDuties />
        },
        {
            path: '/business-informtion-kit',
            element: <BusinessInformationKit />
        },
        {
            path: '/shipping',
            element: <Shipping />
        },
        {
            path: '/termination-directselling',
            element: <Termination />
        },
        {
            path: '/commonly-terms-directselling',
            element: <CommonlyUsedTerms />
        },
        
        {
            path: '/privacy-policy',
            element: <PrivacyPolicy />
        },
        {
            path: '/terms-of-service',
            element: <TermsOfService />
        },
        {
            path: '/legal-documents',
            element: <LegalDocuments />
        },
        {
            path: '/brand/shaara',
            element: <BrandShaara />
        },
    ]
}
export default ShopRoutes
