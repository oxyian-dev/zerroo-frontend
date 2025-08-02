import { IconCashBanknote, IconPigMoney, IconWallet, IconZoomMoney } from "@tabler/icons"

const income = {
    id: 'income',
    title: 'Income',
    type: 'group',
    roles: ['Admin'],
    caption: 'Cutoffs, Payouts',
    children: [
        {
            id: 'wallet-transactions',
            title: 'Wallet Transactions',
            type: 'collapse',
            icon: IconWallet,
            children: [
                {
                    id: 'income-wallet-transactions',
                    type: 'item',
                    title: 'Income',
                    url: '/admin/wallet/income'
                },
                {
                    id: 'purchase-wallet-transactions',
                    type: 'item',
                    title: 'Purchase',
                    url: '/admin/wallet/purchase'
                }
            ]
        },
        {
            id: 'cutoff',
            title: 'Cutoff',
            type: 'collapse',
            icon: IconPigMoney,
            children: [
                {
                    id: 'view-cutoff',
                    title: 'View Cutoffs',
                    type: 'item',
                    url: '/admin/cutoffs'
                },
                {
                    id: 'initiate-cutoff',
                    title: 'Initiate Cutoffs',
                    type: 'item',
                    url: '/admin/cutoffs/initiate'
                }
            ]
        },
        {
            id: 'payout',
            title: 'Payout',
            type: 'collapse',
            icon: IconCashBanknote,
            children: [
                {
                    id: 'view-payout',
                    title: 'View Payout',
                    type: 'item',
                    url: '/admin/payouts'
                },
                {
                    id: 'initiate-payout',
                    title: 'Initiate Payout',
                    type: 'item',
                    url: '/admin/payouts/initiate'
                }
            ]
        },
    ]
}
export default income