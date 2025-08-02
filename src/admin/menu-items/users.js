import { IconSwitch, IconUserCircle, IconUserPlus } from '@tabler/icons';

const users = {
    id: 'users',
    title: 'Users',
    caption: 'Distributors & Org Users',
    type: 'group',
    roles: ['Admin'],
    children: [
        {
            id: 'distributors',
            title: 'Distributors',
            type: 'item',
            url: '/admin/distributors',
            icon: IconUserCircle,
        },
        {
            id: 'org-users',
            title: 'Org Users',
            type: 'collapse',
            icon: IconUserPlus,
            children: [
                {
                    id: 'view-org-users',
                    title: 'View Org Users',
                    type: 'item',
                    url: '/admin/org-users'
                },
                {
                    id: 'add-org-user',
                    title: 'Add Org User',
                    type: 'item',
                    url: '/admin/org-users/add'
                }
            ]
        },
        {
            id: 'transfer',
            title: 'Transfer',
            type: 'item',
            icon: IconSwitch,
            url: '/admin/distributors/transfer'
        }
    ]
};

export default users;
