import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import ServerDataGrid from '../../components/ServerDataGrid'

export default function Incomes() {
    const datatype = [
        'dateTime',
        'username',
        null,
        null,
        'number',
        'number',
        'number',
        'number',

    ]

    const width = [
        200,
        150,
        150,
        150,
        150,
        100,
        150,
        150,
        150,
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Income Wallet Transactions (Net)</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                datatype={datatype}
                ajax={{ url: '/api/wallet-statements/income' }}
                columns={[
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" },
                    { "headerName": "ZID", "field": "ZID", "width": "150", "id": "ZID" },
                    { "headerName": "Firstname", "field": "Firstname", "width": "150", "id": "Firstname" },
                    { "headerName": "Type", "field": "Type", "width": "150", "id": "Type" },
                    { "headerName": "Net Amount", "field": "Effective Amount", "width": "150", "id": "Effective Amount", "type": "number" },
                    { "headerName": "TDS", "field": "TDS", "width": "100", "id": "TDS", "type": "number" },
                    { "headerName": "Admin Charges", "field": "Admin Charges", "width": "150", "id": "Admin Charges", "type": "number" },
                    { "headerName": "Full Amount", "field": "Full Amount", "width": "150", "id": "Full Amount", "type": "number" },
                    { "headerName": "Closing Balance", "field": "Closing Balance", "width": "150", "id": "Closing Balance", "type": "number" }]}
            />
        </Stack>
    )
}
