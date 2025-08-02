import { IconTriangleSquareCircle } from "@tabler/icons"

const report = {
    id: 'report',
    title: 'Reports',
    type: 'group',
    roles: ['Admin'],
    children: [
        {
            id: 'query-report',
            title: 'Query Report',
            type: 'item',
            icon: IconTriangleSquareCircle,
            url: '/admin/report/query'
        }
    ]
}
export default report