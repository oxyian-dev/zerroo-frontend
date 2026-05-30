import { Card, CardContent, Link, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { Link as Route, useParams } from 'react-router-dom'
import ClientDataGrid from '../../components/ClientDataGrid'

export default function PayoutEntries({ id = useParams()['id'] }) {
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center" textTransform="uppercase">
                        Axis Bank Net Payout Entries
                    </Typography>
                </CardContent>
            </Card>

            <ClientDataGrid
                render={[
                    ({ value }) => (
                        <Link component={Route} to={`/admin/distributors?search=${value}`}>{value}</Link>
                    )
                ]}
                ajax={{ url: `/api/payouts/${id}/entries/axis` }}
                experimentalFeatures={{ aggregation: true }}
                aggregation={{
                    model: {
                        "Full Amount": "sum",
                        "TDS Amount": "sum",
                        "Admin Amount": "sum",
                        "Actual Amount": "sum",
                    },
                }}
                columns={[
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "City", "field": "City", "width": "200", "id": "City" },
                    { "headerName": "Account Number", "field": "Account Number", "width": "200", "id": "Account Number" },
                    { "headerName": "Amount", "field": "Amount", "width": "200", "id": "Amount", "type": "number" },
                    { "headerName": "Description", "field": "Description", "width": "200", "id": "Description" },
                    { "headerName": "Email", "field": "Email", "width": "200", "id": "Email" }
                ]}
            />

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center" textTransform="uppercase">
                        Non Axis Bank Net Payout Entries
                    </Typography>
                </CardContent>
            </Card>

            <ClientDataGrid
                render={[
                    ({ value }) => (
                        <Link component={Route} to={`/admin/distributors?search=${value}`}>{value}</Link>
                    )
                ]}
                ajax={{ url: `/api/payouts/${id}/entries/non-axis` }}
                experimentalFeatures={{ aggregation: true }}
                aggregation={{
                    model: {
                        "Full Amount": "sum",
                        "TDS Amount": "sum",
                        "Admin Amount": "sum",
                        "Actual Amount": "sum",
                    },
                }}
                columns={[
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "City", "field": "City", "width": "200", "id": "City" },
                    { "headerName": "Account Number", "field": "Account Number", "width": "200", "id": "Account Number" },
                    { "headerName": "Amount", "field": "Amount", "width": "200", "id": "Amount", "type": "number" },
                    { "headerName": "Description", "field": "Description", "width": "200", "id": "Description" },
                    { "headerName": "IFSC", "field": "IFSC", "width": "200", "id": "IFSC" },
                    { "headerName": "Bank", "field": "Bank", "width": "200", "id": "Bank" },
                    { "headerName": "Email", "field": "Email", "width": "200", "id": "Email" }
                ]}
            />
        </Stack>
    )
}
