import { Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import { IconEdit } from '@tabler/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../../components/ServerDataGrid'

export default function ComboGroups() {
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Combo Group</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                sortable={[false, null, null, null, false]}
                filter={[false, null, null, null, false]}
                datatype={[null, null, 'number', 'number', null]}
                render={[
                    ({ value }) => (
                        <IconButton component={Link} to={`/admin/combos/groups/${value}/edit`}><IconEdit /></IconButton>
                    ),
                    null,
                    null,
                    null,
                    ({ value }) => (
                        <>{value.map((item, id) => <Chip key={id} label={item} />)}</>
                    )
                ]}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "Price", "field": "Price", "width": "200", "id": "Price", "type": "number" },
                    { "headerName": "PV", "field": "PV", "width": "200", "id": "PV", "type": "number" },
                    { "headerName": "Items", "field": "Items", "width": "200", "id": "Items" }
                ]}
                ajax={{ url: '/api/combos/groups' }} />
        </Stack>
    )
}
