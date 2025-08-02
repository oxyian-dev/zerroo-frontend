import {
    IconBinaryTree,
    IconCurrencyRupee,
    IconDashboard,
    IconFile,
    IconList,
    IconPigMoney,
    IconShirt,
    IconShoppingBag,
    IconShoppingCart,
    IconUser,
    IconUsers,
    IconWallet
} from "@tabler/icons";

const menuItems = {
    items: [{
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/dashboard',
                icon: IconDashboard
            },
            {
                id: 'account',
                title: 'Account',
                type: 'item',
                url: 'account',
                icon: IconUser
            },
            {
                id: 'declaration',
                title: 'Declaration',
                type: 'item',
                url: 'declaration',
                icon: IconFile
            }
        ]
    },
    {
        id: 'team',
        title: 'Team',
        type: 'group',
        children: [
            {
                id: 'my-referrals',
                title: 'My Referrals',
                type: 'item',
                url: 'my-referrals',
                icon: IconUsers
            },
            {
                id: 'genealogy',
                title: 'Genealogy',
                type: 'item',
                url: 'genealogy',
                icon: IconBinaryTree
            }
        ]
    },
    {
        id: 'shop',
        title: 'Shop',
        type: 'group',
        children: [
            {
                id: 'shop-page',
                title: 'Shopping Page',
                type: 'item',
                url: '/',
                icon: IconShirt
            },
            {
                id: 'your-orders',
                title: 'Your Orders',
                type: 'item',
                url: 'your-orders',
                icon: IconShoppingBag
            },
        ]
    },
    {
        id: 'wallet-request',
        title: 'Wallet request',
        type: 'group',
        children: [
            {
                id: 'wallet-request',
                type: 'item',
                title: 'Request',
                url: 'wallet-request',
                icon: IconWallet
            },
            {
                id: 'wallet-requests',
                type: 'item',
                title: 'View',
                url: 'wallet-requests',
                icon: IconList
            }
        ]
    },
    {
        id: 'transactions',
        title: 'Transactions',
        type: 'group',
        children: [
            {
                id: 'purchase-wallet-transactions',
                title: 'Purchase Wallet',
                type: 'item',
                url: 'transactions/purchase',
                icon: IconShoppingCart
            },
            {
                id: 'income-wallet-transactions',
                title: 'Income Wallet',
                type: 'item',
                url: 'transactions/income',
                icon: IconPigMoney
            },
            {
                id: 'payout-transactions',
                title: 'Payouts',
                type: 'item',
                url: 'transactions/payout',
                icon: IconCurrencyRupee
            },
        ]
    }]
};

export default menuItems;
