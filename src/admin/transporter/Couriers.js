import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Card, CardContent, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { IconEdit } from '@tabler/icons';
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ServerDataGrid from "../../components/ServerDataGrid";
import fetcher from "../../utils/fetcher";

const Couriers = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [reload, setReload] = useState(0);
    const [selectedCourier, setSelectedCourier] = useState(null)
    const handleChange = file => {
        const formData = new FormData()
        formData.set('excel', file)
        fetcher(`/api/transporters/couriers/${selectedCourier}/serviceable-postcodes`, { method: 'POST', body: formData })
            .then(r => r.json())
            .then(res => {
                if (res.status === 'success') {
                    enqueueSnackbar('Postcodes updated Successfully', { variant: 'success' })
                    setReload(reload + 1)
                } else {
                    enqueueSnackbar('Exception occurred', { variant: 'error' })
                }
            })
            .catch(() => {
                enqueueSnackbar('Error occurred', { variant: 'error' })
            })
            .finally(() => {
                document.getElementById('upload').value = ''
            })
    }
    const render = [({ value }) => {
        return (
            <Box>
                <Tooltip title="Edit this Courier">
                    <IconButton component={Link} to={`/admin/couriers/${value}/edit`}>
                        <IconEdit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Upload Serviceable Postcodes">
                    <IconButton onClick={() => {
                        setSelectedCourier(value)
                        document.getElementById('upload').click()
                    }}>
                        <UploadFileIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    }]

    const width = [
        120,
        200,
        150,
        500
    ]

    return (
        <React.Fragment>
            <input
                id="upload"
                hidden
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                onInput={({ target }) => {
                    handleChange(target.files[0])
                }} />
            <Stack spacing={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h2" textAlign="center">Couriers</Typography>
                    </CardContent>
                </Card>
                <ServerDataGrid
                    width={width}
                    render={render}
                    ajax={{ url: '/api/transporters/couriers' }}
                    columns={[
                        { "headerName": "Action", "field": "Action", "width": "120", "id": "Action" },
                        { "headerName": "Courier", "field": "Courier", "width": "200", "id": "Courier" },
                        { "headerName": "Display", "field": "Display", "width": "150", "id": "Display" },
                        { "headerName": "Tracking URL", "field": "Tracking URL", "width": "500", "id": "Tracking URL" },
                        { "headerName": "Forward Serviceable", "field": "Forward Serviceable", "width": "200", "id": "Forward Serviceable" },
                        { "headerName": "Return Serviceable", "field": "Return Serviceable", "width": "200", "id": "Return Serviceable" }
                    ]}
                />
            </Stack>
        </React.Fragment>
    )
}
export default Couriers