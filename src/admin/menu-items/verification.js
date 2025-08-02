import { IconBuildingBank, IconIdBadge2, IconWallet } from "@tabler/icons";

const verification = {
    id: 'verification',
    title: 'Verification',
    type: 'group',
    roles: ['Admin'],
    children: [
        {
            id: 'kyc',
            title: 'KYC',
            type: 'collapse',
            icon: IconIdBadge2,
            children: [
                {
                    id: 'pending-kyc',
                    title: 'Pending',
                    type: 'item',
                    url: '/admin/kyc/pending'
                },
                {
                    id: 'verified-kyc',
                    title: 'Verified',
                    type: 'item',
                    url: '/admin/kyc/verified'
                },
                {
                    id: 'rejected-kyc',
                    title: 'Rejected',
                    type: 'item',
                    url: '/admin/kyc/rejected'
                }
            ]
        },
        {
            id: 'bank',
            title: 'Bank Verification',
            type: 'collapse',
            icon: IconBuildingBank,
            children: [
                {
                    id: 'pending-bank',
                    title: 'Pending',
                    type: 'item',
                    url: '/admin/bank/pending'
                },
                {
                    id: 'verified-bank',
                    title: 'Verified',
                    type: 'item',
                    url: '/admin/bank/verified'
                },
                {
                    id: 'rejected-bank',
                    title: 'Rejected',
                    type: 'item',
                    url: '/admin/bank/rejected'
                }
            ]
        },
        {
            id: 'purchase-wallet',
            title: 'Purchase Wallet',
            type: 'collapse',
            icon: IconWallet,
            children: [
                {
                    id: 'pending-wallet-requests',
                    title: 'Pending',
                    type: 'item',
                    url: '/admin/wallet-requests/pending'
                },
                {
                    id: 'approved-wallet-requests',
                    title: 'Approved',
                    type: 'item',
                    url: '/admin/wallet-requests/approved'
                },
                {
                    id: 'rejected-wallet-requests',
                    title: 'Rejected',
                    type: 'item',
                    url: '/admin/wallet-requests/rejected'
                }
            ]
        }
    ]
}

export default verification