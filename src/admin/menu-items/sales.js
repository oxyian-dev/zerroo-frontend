import { IconReceipt, IconTag, IconTruckDelivery } from '@tabler/icons';
const sales = {
    id: 'sales',
    title: 'Sales',
    caption: 'Orders, Invoices, etc',
    type: 'group',
    roles: ['Admin'],
    children: [
        {
            id: 'sale-orders',
            title: 'Sale Orders',
            type: 'item',
            icon: IconTag,
            url: '/admin/sale-orders/all'
        },
        {
            id: 'shipments',
            title: 'Shipments',
            type: 'item',
            url: '/admin/shipments/all',
            icon: IconTruckDelivery
        },
        {
            id: 'invoices',
            title: 'Invoices',
            type: 'item',
            icon: IconReceipt,
            url: '/admin/invoices',
        }
    ]
}

export default sales;