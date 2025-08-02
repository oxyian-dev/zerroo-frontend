import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import ServerDataGrid from '../../components/ServerDataGrid'

export default function CutoffDetails({ id = useParams()['id'] }) {
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Cutoff Details</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                ajax={{ url: `/api/cutoffs/${id}` }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500, autoFocus: true }
                    }
                }}
                columns={[
                    { "headerName": "ZID", "field": "ZID", "width": "200", "id": "ZID" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "Cutoff Left Pv", "field": "Cutoff Left Pv", "width": "200", "id": "Cutoff Left Pv" },
                    { "headerName": "Cutoff Right Pv", "field": "Cutoff Right Pv", "width": "200", "id": "Cutoff Right Pv" },
                    { "headerName": "Cutoff Self Pv", "field": "Cutoff Self Pv", "width": "200", "id": "Cutoff Self Pv" },
                    { "headerName": "Cutoff Sp Pv", "field": "Cutoff Sp Pv", "width": "200", "id": "Cutoff Sp Pv" },
                ]}
            />
        </Stack>
    )
}
