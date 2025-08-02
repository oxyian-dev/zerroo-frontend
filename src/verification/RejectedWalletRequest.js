import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { IconList } from '@tabler/icons'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../components/ServerDataGrid'

export default function RejectedWalletRequest() {

    const datatype = [
        null,
        'dateTime',
        'username',
        'number',
        null,
        null,
        null,
        'dateTime',
    ]

    const sortable = [
        false
    ]

    const filter = [false]

    const width = [
        100,
        200,
        200,
        100,
        200
    ]

    const render = [
        ({ value }) => <IconButton component={Link} to={`/admin/wallet-requests/${value}`}><IconList /></IconButton>
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Rejected Wallet Requests</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                datatype={datatype}
                sortable={sortable}
                filter={filter}
                width={width}
                render={render}
                ajax={{ url: '/api/verification/wallet/rejected' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
                    { "headerName": "Transaction Id", "field": "Transaction Id", "width": "200", "id": "Transaction Id" },
                    { "headerName": "Remark", "field": "Remark", "width": "200", "id": "Remark" },
                    { "headerName": "Rejected By", "field": "Rejected By", "width": "200", "id": "Rejected By" },
                    { "headerName": "Rejected Time", "field": "Rejected Time", "width": "200", "id": "Rejected Time" },
                ]}
            />
        </Stack>
    )
}
