import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import ServerDataGrid from '../components/ServerDataGrid'


export default function PurchaseWalletTransaction() {
    const datatype = [
        'dateTime',
        null,
        'number',
        'number',
    ]

    const width = [
        null,
        null,
        150,
        150,
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Purchase Wallet Transactions</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                ajax={{ url: '/api/transactions/purchase' }}
                datatype={datatype}
                width={width}
                columns={[
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time" },
                    { "headerName": "Type", "field": "Type", "width": "200", "id": "Type" },
                    { "headerName": "Amount", "field": "Amount", "width": "150", "id": "Amount", "type": "number" },
                    { "headerName": "Closing Balance", "field": "Closing Balance", "width": "150", "id": "Closing Balance", "type": "number" },
                ]}
            />
        </Stack>
    )
}
