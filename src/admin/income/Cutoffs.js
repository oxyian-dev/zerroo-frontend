import { Backdrop, Card, CardContent, Chip, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import { IconList } from '@tabler/icons'
import { useConfirm } from "material-ui-confirm"
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../../components/ServerDataGrid'

export default function Cutoffs() {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const confirm = useConfirm();
    const { enqueueSnackbar } = useSnackbar();

    const render = [
        ({ value }) => (
            <IconButton component={Link} to={`/admin/cutoffs/${value}`}>
                <IconList />
            </IconButton>
        ),
        null,
        null,
        ({ value, id }) => {
            switch (value) {
                case 'Pending':
                    return <Chip label={value} color="error" />
                case 'Initiated':
                    return <Chip label={value} color="warning" />
                case 'Processed':
                    return <Chip label={value} color="success" />
                default:
                    return <Chip label={value} />
            }
        }
    ]
    const datatype = [
        null,
        null,
        'dateTime',
        null,
        'dateTime',
        null
    ]

    const width = [
        100,
        120,
    ]

    return (
        <React.Fragment>
            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: ({ zIndex }) => zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Stack spacing={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h2" textAlign="center">Cutoffs</Typography>
                    </CardContent>
                </Card>
                <ServerDataGrid
                    width={width}
                    refresh={refresh}
                    datatype={datatype}
                    sortable={[false]}
                    filter={[false]}
                    render={render}
                    ajax={{ url: '/api/cutoffs' }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500, autoFocus: true }
                        }
                    }}
                    columns={[
                        { "headerName": "Action", "field": "Action", "width": "100", "id": "Action", "type": "number" },
                        { "headerName": "Cutoff Number", "field": "Cutoff Number", "width": "120", "id": "Cutoff Number", "type": "number" },
                        { "headerName": "Created Time", "field": "Created Time", "width": "200", "id": "Created Time", "type": "dateTime" },
                        { "headerName": "Status", "field": "Status", "width": "200", "id": "Status" },
                        { "headerName": "Initiated Time", "field": "Initiated Time", "width": "200", "id": "Initiated Time" },
                        { "headerName": "Initiated By", "field": "Initiated By", "width": "200", "id": "Initiated By" }
                    ]}
                />
            </Stack>
        </React.Fragment>
    )
}
