import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import ServerDataGrid from '../components/ServerDataGrid'


export default function PayoutTransaction() {
    const datatype = [
        'date',
        'date',
        'number',
    ]

    const width = [
        150,
        150,
        100,
        200,
        150,
        150,
        300,
    ]

    return (
        <Stack spacing={2}>
                <Card variant="outlined">
                    <CardContent>
                    <Typography variant="h2" textAlign="center">Net Wallet Payouts</Typography>
                    </CardContent>
                </Card>

            <ServerDataGrid
                width={width}
                ajax={{ url: '/api/transactions/payout' }}
                datatype={datatype}
                columns={[
                    { "headerName": "Date", "field": "Date", "width": "150", "id": "Date" },
                    { "headerName": "Approved Date", "field": "Approved Date", "width": "150", "id": "Approved Date" },
                    { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
                    { "headerName": "Account Number", "field": "Account Number", "width": "200", "id": "Account Number" },
                    { "headerName": "IFSC", "field": "IFSC", "width": "150", "id": "IFSC" },
                    { "headerName": "Bank", "field": "Bank", "width": "150", "id": "Bank" },
                    { "headerName": "Branch", "field": "Branch", "width": "300", "id": "Branch" }
                ]}
            />
        </Stack>
    )
}
