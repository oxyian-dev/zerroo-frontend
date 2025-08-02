import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { IconList } from '@tabler/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../components/ServerDataGrid'


export default function ApprovedWalletRequest() {
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
        100,
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
                    <Typography variant="h2" textAlign="center">Approvred Wallet Requests</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                datatype={datatype}
                sortable={sortable}
                filter={filter}
                width={width}
                render={render}
                ajax={{ url: '/api/verification/wallet/approved' }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "100", "id": "Action" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "ZID", "field": "ZID", "width": "100", "id": "ZID" },
                    { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
                    { "headerName": "Transaction Id", "field": "Transaction Id", "width": "200", "id": "Transaction Id" },
                    { "headerName": "Remark", "field": "Remark", "width": "200", "id": "Remark" },
                    { "headerName": "Approved By", "field": "Approved By", "width": "200", "id": "Approved By" },
                    { "headerName": "Approved Time", "field": "Approved Time", "width": "200", "id": "Approved Time" },
                ]}
            />
        </Stack>
    )
}
