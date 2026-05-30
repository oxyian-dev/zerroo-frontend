import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import ServerDataGrid from '../components/ServerDataGrid'

export default function IncomeWalletTransaction() {
    const datatype = [
        'dateTime',
        null,
        'number',
        'number',
        'number',
        'number',
        'number',
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Income Wallet Transactions (Net)</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                ajax={{ url: '/api/transactions/income' }}
                datatype={datatype}
                columns={[
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "Type", "field": "Type", "width": "200", "id": "Type" },
                    { "headerName": "Effective Amount", "field": "Effective Amount", "width": "200", "id": "Effective Amount", "type": "number" },
                    { "headerName": "TDS", "field": "TDS", "width": "200", "id": "TDS", "type": "number" },
                    { "headerName": "Admin Charges", "field": "Admin Charges", "width": "200", "id": "Admin Charges", "type": "number" },
                    { "headerName": "Full Amount", "field": "Full Amount", "width": "200", "id": "Full Amount", "type": "number" },
                    { "headerName": "Closing Balance", "field": "Closing Balance", "width": "200", "id": "Closing Balance", "type": "number" }
                ]}
            />
        </Stack>
    )
}
