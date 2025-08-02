import { IconPackage, IconTractor } from "@tabler/icons"

const transporters = {
    id: 'transporters',
    title: 'Transporters',
    type: 'group',
    roles: ['Admin'],
    caption: 'Transporters, Couriers',
    children: [
        {
            id: 'transporters',
            title: 'Transporters',
            type: 'collapse',
            icon: IconTractor,
            children: [
                {
                    id: 'view-transporters',
                    title: 'View Transporters',
                    type: 'item',
                    url: '/admin/transporters'
                },
                {
                    id: 'add-transporters',
                    title: 'Add Transporters',
                    type: 'item',
                    url: '/admin/transporters/add'
                }
            ]
        },
        {
            id: 'couriers',
            title: 'Couriers',
            type: 'collapse',
            icon: IconPackage,
            children: [
                {
                    id: 'view-couriers',
                    title: 'View Couriers',
                    type: 'item',
                    url: '/admin/couriers'
                },
                {
                    id: 'add-courier',
                    title: 'Add Courier',
                    type: 'item',
                    url: '/admin/couriers/add'
                }
            ]
        }
    ]
}


export default transporters