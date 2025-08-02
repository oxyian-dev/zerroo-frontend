import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import ServerDataGrid from '../../components/ServerDataGrid'

export default function PurchaseWallets() {
    const datatype = [
        'dateTime',
        'username',
        null,
        'number',
        'number',
        'number',
    ]

    const width = [
        null,
        200,
        null,
        100,
        150,
        150
    ]
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Purchase Wallet Transactions</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                datatype={datatype}
                ajax={{ url: '/api/wallet-statements/purchase' }}
                columns={[
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
                    { "headerName": "Opening Amount", "field": "Opening Amount", "width": "150", "id": "Opening Amount", "type": "number" },
                    { "headerName": "Closing Amount", "field": "Closing Amount", "width": "150", "id": "Closing Amount", "type": "number" },
                    { "headerName": "Type", "field": "Type", "width": "200", "id": "Type" },
                    { "headerName": "Remark", "field": "Remark", "width": "200", "id": "Remark" }
                ]}
            />
        </Stack>
    )
}
