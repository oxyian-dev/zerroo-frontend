import { Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import { IconList } from '@tabler/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../../components/ServerDataGrid'

export default function Payouts() {
    const color = {
        "Pending": "error",
        "Approved": "success"
    }

    const render = [
        ({ value }) => (
            <IconButton component={Link} to={`/admin/payouts/${value}`}>
                <IconList />
            </IconButton>
        ),
        ({ value }) => (
            <Chip color={color[value]} label={value} />
        )
    ]

    const datatype = [
        null,
        null,
        null,
        'dateTime',
        null,
        'dateTime',
    ]

    const width = [
        150,
        120,
        100,
    ]

    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">
                        Payouts
                    </Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                width={width}
                filter={[false]}
                datatype={datatype}
                render={render}
                ajax={{ url: '/api/payouts' }}
                columns={[
                    { "headerName": "Payout Id", "field": "Payout Id", "width": "150", "id": "Payout Id", "type": "number" },
                    { "headerName": "Status", "field": "Status", "width": "120", "id": "Status" },
                    { "headerName": "Amount", "field": "Amount", "width": "100", "id": "Amount", "type": "number" },
                    { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" },
                    { "headerName": "Creator", "field": "Creator", "width": "200", "id": "Creator" },
                    { "headerName": "Approved Time", "field": "Approved Time", "width": "200", "id": "Approved Time", "type": "dateTime" },
                    { "headerName": "Approver", "field": "Approver", "width": "200", "id": "Approver" }
                ]}
            />
        </Stack>
    )
}
