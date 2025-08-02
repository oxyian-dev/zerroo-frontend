import { IconDots, IconPercentage } from "@tabler/icons"

const audit = {
    id: 'audit',
    caption: "GST & TDS",
    title: 'Audit',
    type: 'group',
    roles: ['Admin'],
    children: [
        {
            id: 'gst',
            title: 'GST',
            type: 'item',
            icon: IconPercentage,
            url: '/admin/gst'
        },
        {
            id: 'tds',
            title: 'TDS',
            type: 'item',
            icon: IconDots,
            url: '/admin/tds'
        },
    ]
}
export default audit