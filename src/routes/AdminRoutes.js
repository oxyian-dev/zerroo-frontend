import { lazy } from 'react';
import AdminLayout from "../admin/AdminLayout";
import Loadable from '../components/Loadable';
import ShipmentLayout from '../layout/ShipmentLayout';
import SaleOrderLayout from '../layout/SaleOrderLayout';

const AdjustmentList = Loadable(lazy(() => import("../admin/item/stock/AdjustmentList")));
const AdjustmentDetails = Loadable(lazy(() => import("../admin/item/stock/AdjustmentDetails")));
const StockTransfer = Loadable(lazy(() => import("../admin/item/stock/StockTransfer")));
const TransferList = Loadable(lazy(() => import("../admin/item/stock/TransferList")));
const TransferDetails = Loadable(lazy(() => import("../admin/item/stock/TransferDetails")));
const InwardList = Loadable(lazy(() => import("../admin/item/stock/InwardList")));
const Inward = Loadable(lazy(() => import("../admin/item/stock/Inward")));
const InwardDetails = Loadable(lazy(() => import("../admin/item/stock/InwardDetails")));
const StockList = Loadable(lazy(() => import("../admin/item/stock/StockList")));
const AddAdjustment = Loadable(lazy(() => import("../admin/item/stock/AddAdjustment")));
const DistributorList = Loadable(lazy(() => import("../admin/user/DistributorList")));
const DistributorDetails = Loadable(lazy(() => import("../admin/user/DistributorDetails")));
const EditDistributor = Loadable(lazy(() => import("../admin/user/EditDistributor")));
const AddPV = Loadable(lazy(() => import("../admin/user/AddPV")));
const AddWallet = Loadable(lazy(() => import("../admin/user/AddWallet")));
const Transfer = Loadable(lazy(() => import("../admin/user/Transfer")));
const EditBankDetails = Loadable(lazy(() => import("../admin/user/EditBankDetails")));
const EditKycDetails = Loadable(lazy(() => import("../admin/user/EditKycDetails")));
const AddOrgUser = Loadable(lazy(() => import("../admin/user/AddOrgUser")));
const OrgUserList = Loadable(lazy(() => import("../admin/user/OrgUserList")));
const EditOrgUser = Loadable(lazy(() => import("../admin/user/EditOrgUser")));
const CategoryList = Loadable(lazy(() => import("../admin/category/CategoryList")));
const AddCategory = Loadable(lazy(() => import("../admin/category/AddCategory")));
const EditCategory = Loadable(lazy(() => import("../admin/category/EditCategory")));
const AddPriceList = Loadable(lazy(() => import("../admin/item/price-list/AddPriceList")));
const ViewPriceList = Loadable(lazy(() => import("../admin/item/price-list/ViewPriceList")));
const EditPriceList = Loadable(lazy(() => import("../admin/item/price-list/EditPriceList")));
const AddItemGroup = Loadable(lazy(() => import("../admin/item/item-group/AddItemGroup")));
const ItemGroupList = Loadable(lazy(() => import("../admin/item/item-group/ItemGroupList")));
const EditItemGroup = Loadable(lazy(() => import("../admin/item/item-group/EditItemGroup")));
const ViewImageLists = Loadable(lazy(() => import("../admin/item/image-lists/ViewImageLists")));
const ImageListDetails = Loadable(lazy(() => import("../admin/item/image-lists/ImageListDetails")));
const ViewSpecifications = Loadable(lazy(() => import("../admin/item/specification/ViewSpecifications")));
const AddSpecification = Loadable(lazy(() => import("../admin/item/specification/AddSpecification")));
const SpecificationLists = Loadable(lazy(() => import("../admin/item/specification/SpecificationLists")));
const AddSpecificationList = Loadable(lazy(() => import("../admin/item/specification/AddSpecificationList")));
const EditSpecificationList = Loadable(lazy(() => import("../admin/item/specification/EditSpecificationList")));
const SpecificationTypes = Loadable(lazy(() => import("../admin/item/specification/SpecificationTypes")));
const AddSpecificationType = Loadable(lazy(() => import("../admin/item/specification/AddSpecificationType")));
const ItemList = Loadable(lazy(() => import("../admin/item/ItemList")));
const AddItem = Loadable(lazy(() => import("../admin/item/AddItem")));
const CloneItem = Loadable(lazy(() => import("../admin/item/CloneItem")));
const ViewSize = Loadable(lazy(() => import("../admin/item/variants/size/ViewSize")));
const AddSize = Loadable(lazy(() => import("../admin/item/variants/size/AddSize")));
const EditSize = Loadable(lazy(() => import("../admin/item/variants/size/EditSize")));
const ViewColor = Loadable(lazy(() => import("../admin/item/variants/color/ViewColor")));
const AddColor = Loadable(lazy(() => import("../admin/item/variants/color/AddColor")));
const EditColor = Loadable(lazy(() => import("../admin/item/variants/color/EditColor")));
const EditItem = Loadable(lazy(() => import("../admin/item/EditItem")));
const Dashboard = Loadable(lazy(() => import('../admin/Dashboard')));
const PendingKyc = Loadable(lazy(() => import('../verification/PendingKyc')));
const VerifiedKyc = Loadable(lazy(() => import('../verification/VerifiedKyc')));
const RejectedKyc = Loadable(lazy(() => import('../verification/RejectedKyc')));
const KycDetails = Loadable(lazy(() => import('../verification/KycDetails')));
const PendingBank = Loadable(lazy(() => import('../verification/PendingBank')));
const VerifiedBank = Loadable(lazy(() => import('../verification/VerifiedBank')));
const RejectedBank = Loadable(lazy(() => import('../verification/RejectedBank')));
const BankDetails = Loadable(lazy(() => import('../verification/BankDetails')));
const PendingWalletRequest = Loadable(lazy(() => import('../verification/PendingWalletRequest')));
const RejectedWalletRequest = Loadable(lazy(() => import('../verification/RejectedWalletRequest')));
const ApprovedWalletRequest = Loadable(lazy(() => import('../verification/ApprovedWalletRequest')));
const WalletRequest = Loadable(lazy(() => import('../verification/WalletRequest')));
const QueryReport = Loadable(lazy(() => import("../admin/report/QueryReport")));
const SaleOrders = Loadable(lazy(() => import("../admin/sales/SaleOrders")));
const UnShippedSaleOrders = Loadable(lazy(() => import("../admin/sales/UnShippedSaleOrders")));
const ShippedSaleOrders = Loadable(lazy(() => import("../admin/sales/ShippedSaleOrders")));
const SaleOrderDetails = Loadable(lazy(() => import("../admin/sales/SaleOrderDetails")));
const AddSaleOrder = Loadable(lazy(() => import("../admin/sales/AddSaleOrder")));
const Invoice = Loadable(lazy(() => import("../admin/sales/Invoice")));
const Inventories = Loadable(lazy(() => import("../admin/inventory/Inventories")));
const Brands = Loadable(lazy(() => import("../admin/brand/Brands")));
const AddBrand = Loadable(lazy(() => import("../admin/brand/AddBrand")));
const EditBrand = Loadable(lazy(() => import("../admin/brand/EditBrand")));
const AddInventory = Loadable(lazy(() => import("../admin/inventory/AddInventory")));
const Branches = Loadable(lazy(() => import("../admin/inventory/Branches")));
const AddBranch = Loadable(lazy(() => import("../admin/inventory/AddBranch")));
const Transporters = Loadable(lazy(() => import("../admin/transporter/Transporters")));
const AddTransporter = Loadable(lazy(() => import("../admin/transporter/AddTransporter")));
const EditTransporter = Loadable(lazy(() => import("../admin/transporter/EditTransporter")));
const Couriers = Loadable(lazy(() => import("../admin/transporter/Couriers")));
const AddCourier = Loadable(lazy(() => import("../admin/transporter/AddCourier")));
const EditCourier = Loadable(lazy(() => import("../admin/transporter/EditCourier")));
const AllForwardShipments = Loadable(lazy(() => import("../admin/sales/AllForwardShipments")));
const PendingForwardShipments = Loadable(lazy(() => import("../admin/sales/PendingForwardShipments")));
const StatusForwardShipments = Loadable(lazy(() => import("../admin/sales/StatusForwardShipments")));
const DispatchShipment = Loadable(lazy(() => import("../admin/sales/DispatchShipment")));
const Combos = Loadable(lazy(() => import("../admin/combo/Combos")));
const AddCombo = Loadable(lazy(() => import("../admin/combo/AddCombo")));
const EditCombo = Loadable(lazy(() => import("../admin/combo/EditCombo")));
const AddComboGroup = Loadable(lazy(() => import("../admin/combo/AddComboGroup")));
const EditComboGroup = Loadable(lazy(() => import("../admin/combo/EditComboGroup")));
const ComboGroups = Loadable(lazy(() => import("../admin/combo/ComboGroups")));
const ComboGroupMapping = Loadable(lazy(() => import("../admin/combo/ComboGroupMapping")));
const Cutoffs = Loadable(lazy(() => import("../admin/income/Cutoffs")));
const CutoffDetails = Loadable(lazy(() => import("../admin/income/CutoffDetails")));
const InitiateCutoff = Loadable(lazy(() => import("../admin/income/InitiateCutoff")));
const Incomes = Loadable(lazy(() => import("../admin/income/Incomes")));
const PurchaseWallets = Loadable(lazy(() => import("../admin/income/PurchaseWallets")));
const Payouts = Loadable(lazy(() => import("../admin/income/Payouts")));
const PayoutEntries = Loadable(lazy(() => import("../admin/income/PayoutEntries")));
const InitiatePayout = Loadable(lazy(() => import("../admin/income/InitiatePayout")));

const Gst = Loadable(lazy(() => import("../audit/Gst")));
const Tds = Loadable(lazy(() => import("../audit/Tds")));


const AdminRoutes = {
    path: 'admin',
    element: <AdminLayout />,
    children: [
        {
            path: '',
            element: <Dashboard />
        },
        {
            path: 'distributors',
            element: <DistributorList />
        },
        {
            path: 'distributors/:id',
            element: <DistributorDetails />
        },
        {
            path: 'distributors/:id/edit',
            element: <EditDistributor />
        },
        {
            path: 'distributors/:id/pv',
            element: <AddPV />
        },
        {
            path: 'distributors/:id/wallet',
            element: <AddWallet />
        },
        {
            path: 'distributors/transfer',
            element: <Transfer />
        },
        {
            path: 'distributors/:id/bank',
            element: <EditBankDetails />
        },
        {
            path: 'distributors/:id/kyc',
            element: <EditKycDetails />
        },
        {
            path: 'org-users',
            element: <OrgUserList />
        },
        {
            path: 'org-users/add',
            element: <AddOrgUser />
        },
        {
            path: 'org-users/:id/edit',
            element: <EditOrgUser />
        },
        {
            path: 'categories/add',
            element: <AddCategory />
        },
        {
            path: 'categories/view',
            element: <CategoryList />
        },
        {
            path: 'categories/:id/edit',
            element: <EditCategory />
        },
        {
            path: 'item-groups/view',
            element: <ItemGroupList />
        },
        {
            path: 'item-groups/add',
            element: <AddItemGroup />
        },
        {
            path: 'item-groups/:id/edit',
            element: <EditItemGroup />
        },
        {
            path: 'price-list/view',
            element: <ViewPriceList />
        },
        {
            path: 'price-list/add',
            element: <AddPriceList />
        },
        {
            path: 'price-list/:id/edit',
            element: <EditPriceList />
        },
        {
            path: 'image-lists',
            element: <ViewImageLists />
        },
        {
            path: 'image-lists/:id',
            element: <ImageListDetails />
        },
        {
            path: 'item-specifications/view',
            element: <ViewSpecifications />
        },
        {
            path: 'item-specifications/add',
            element: <AddSpecification />
        },
        {
            path: 'item-specifications/list',
            element: <SpecificationLists />
        },
        {
            path: 'item-specifications/list/create',
            element: <AddSpecificationList />
        },
        {
            path: 'item-specifications/list/:id/edit',
            element: <EditSpecificationList />
        },
        {
            path: 'item-specifications/types',
            element: <SpecificationTypes />
        },
        {
            path: 'item-specifications/new-type',
            element: <AddSpecificationType />
        },
        {
            path: 'items',
            element: <ItemList />
        },
        {
            path: 'items/add',
            element: <AddItem />
        },
        {
            path: 'items/:id/clone',
            element: <CloneItem />
        },
        {
            path: 'items/:id/edit',
            element: <EditItem />
        },
        {
            path: 'variants/size',
            element: <ViewSize />
        },
        {
            path: 'variants/size/add',
            element: <AddSize />
        },
        {
            path: 'variants/size/:id/edit',
            element: <EditSize />
        },
        {
            path: 'variants/color',
            element: <ViewColor />
        },
        {
            path: 'variants/color/add',
            element: <AddColor />
        },
        {
            path: 'variants/color/:id/edit',
            element: <EditColor />
        },
        {
            path: 'stocks',
            element: <StockList />
        },
        {
            path: 'stocks/inward/view',
            element: <InwardList />
        },
        {
            path: 'stocks/inward/:id',
            element: <InwardDetails />
        },
        {
            path: 'stocks/inward/add',
            element: <Inward />
        },
        {
            path: 'stocks/adjustment/add',
            element: <AddAdjustment />
        },
        {
            path: 'stocks/adjustment',
            element: <AdjustmentList />
        },
        {
            path: 'stocks/adjustment/:id',
            element: <AdjustmentDetails />
        },
        {
            path: 'stocks/transfer',
            element: <StockTransfer />
        },
        {
            path: 'stocks/transfer/:id',
            element: <TransferDetails />
        },
        {
            path: 'stocks/transfer/view',
            element: <TransferList />
        },
        {
            path: 'kyc/pending',
            element: <PendingKyc />
        },
        {
            path: 'kyc/verified',
            element: <VerifiedKyc />
        },
        {
            path: 'kyc/rejected',
            element: <RejectedKyc />
        },
        {
            path: 'kyc/details/:id',
            element: <KycDetails />
        },
        {
            path: 'bank/pending',
            element: <PendingBank />
        },
        {
            path: 'bank/verified',
            element: <VerifiedBank />
        },
        {
            path: 'bank/rejected',
            element: <RejectedBank />
        },
        {
            path: 'wallet-requests/pending',
            element: <PendingWalletRequest />
        },
        {
            path: 'wallet-requests/rejected',
            element: <RejectedWalletRequest />
        },
        {
            path: 'wallet-requests/approved',
            element: <ApprovedWalletRequest />
        },
        {
            path: 'wallet-requests/:id',
            element: <WalletRequest />
        },
        {
            path: 'bank/details/:id',
            element: <BankDetails />
        },
        {
            path: 'report/query',
            element: <QueryReport />
        },
        {
            path: 'sale-orders',
            element: <SaleOrderLayout />,
            children: [
                {
                    path: 'all',
                    element: <SaleOrders />
                },
                {
                    path: 'un-shipped',
                    element: <UnShippedSaleOrders />
                },
                {
                    path: 'shipped',
                    element: <ShippedSaleOrders />
                },
            ],
        },
        {
            path: 'sale-orders/:id',
            element: <SaleOrderDetails />
        },
        {
            path: 'sale-orders/add',
            element: <AddSaleOrder />
        },
        {
            path: 'shipments',
            element: <ShipmentLayout />,
            children: [
                {
                    path: 'all',
                    element: <AllForwardShipments />
                },
                {
                    path: 'pending',
                    element: <PendingForwardShipments />
                },
                {
                    path: ':status',
                    element: <StatusForwardShipments />
                }
            ]
        },
        {
            path: 'shipments/:id/dispatch',
            element: <DispatchShipment />
        },
        {
            path: 'invoices',
            element: <Invoice />
        },
        {
            path: 'inventories',
            element: <Inventories />
        },
        {
            path: 'add-inventory',
            element: <AddInventory />
        },
        {
            path: 'branches',
            element: <Branches />
        },
        {
            path: 'branches/add',
            element: <AddBranch />
        },
        {
            path: 'brands/view',
            element: <Brands />
        },
        {
            path: 'brands/add',
            element: <AddBrand />
        },
        {
            path: 'brands/:id/edit',
            element: <EditBrand />
        },
        {
            path: 'transporters',
            element: <Transporters />
        },
        {
            path: 'transporters/add',
            element: <AddTransporter />
        },
        {
            path: 'transporters/:id/edit',
            element: <EditTransporter />
        },
        {
            path: 'couriers',
            element: <Couriers />
        },
        {
            path: 'couriers/add',
            element: <AddCourier />
        },
        {
            path: 'couriers/:id/edit',
            element: <EditCourier />
        },
        {
            path: 'combos',
            element: <Combos />
        },
        {
            path: 'combos/add',
            element: <AddCombo />
        },
        {
            path: 'combos/:id/edit',
            element: <EditCombo />
        },
        {
            path: 'combos/:id/mapping',
            element: <ComboGroupMapping />
        },
        {
            path: 'combos/groups',
            element: <ComboGroups />
        },
        {
            path: 'combos/groups/add',
            element: <AddComboGroup />
        },
        {
            path: 'combos/groups/:id/edit',
            element: <EditComboGroup />
        },
        {
            path: 'cutoffs',
            element: <Cutoffs />
        },
        {
            path: 'cutoffs/:id',
            element: <CutoffDetails />
        },
        {
            path: 'cutoffs/initiate',
            element: <InitiateCutoff />
        },
        {
            path: 'cutoffs/pp',
            element: <Cutoffs />
        },
        {
            path: 'wallet/income',
            element: <Incomes />
        },
        {
            path: 'wallet/purchase',
            element: <PurchaseWallets />
        },
        {
            path: 'payouts',
            element: <Payouts />
        },
        {
            path: 'payouts/:id',
            element: <PayoutEntries />
        },
        {
            path: 'payouts/initiate',
            element: <InitiatePayout />
        },
        {
            path: 'gst',
            element: <Gst />
        },
        {
            path: 'tds',
            element: <Tds />
        },
    ]
};

export default AdminRoutes;
