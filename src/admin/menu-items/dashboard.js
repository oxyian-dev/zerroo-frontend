import { IconDashboard } from '@tabler/icons';

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default-dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/admin',
            icon: IconDashboard
        }
    ]
};

export default dashboard;
