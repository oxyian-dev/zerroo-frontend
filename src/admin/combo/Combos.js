import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { GridActionsCellItem, useGridApiContext } from '@mui/x-data-grid-premium'
import { IconEdit, IconTrash } from '@tabler/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ServerDataGrid from '../../components/ServerDataGrid'
import { WorkDriveImage } from '../../utils/util'
import ComboGroupMapping from './ComboGroupMapping'

export default function Combos() {
    const ListDetailComponent = useCallback(({ row }) => {
        const apiRef = useGridApiContext();
        const [width, setWidth] = useState(() => {
            const dimensions = apiRef.current.getRootDimensions();
            return dimensions.viewportInnerSize.width;
        });

        const handleViewportInnerSizeChange = useCallback(() => {
            const dimensions = apiRef.current.getRootDimensions();
            setWidth(dimensions.viewportInnerSize.width);
        }, [apiRef]);

        useEffect(() => {
            return apiRef.current.subscribeEvent(
                'viewportInnerSizeChange',
                handleViewportInnerSizeChange,
            );
        }, [apiRef, handleViewportInnerSizeChange]);

        return (
            <Box width={width} p={2} borderTop={1}>
                <ComboGroupMapping id={row.id} />
            </Box>
        )
    }, [])

    const render = [
        ({ value }) => <IconButton component={Link} to={`/admin/combos/${value}/edit`}><IconEdit /></IconButton>,
        ({ value }) => <WorkDriveImage auto="width" image={value} />,
    ]
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Combos</Typography>
                </CardContent>
            </Card>
            <ServerDataGrid
                sortable={[false]}
                filter={[false]}
                customize={{ rowHeight: 150 }}
                render={render}
                ajax={{ url: '/api/combos' }}
                getDetailPanelContent={({ row }) => <ListDetailComponent row={row} />}
                getDetailPanelHeight={() => 'auto'}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Image", "field": "Image", "width": "200", "id": "Image" },
                    { "headerName": "Name", "field": "Name", "width": "200", "id": "Name" },
                    { "headerName": "Description", "field": "Description", "width": "200", "id": "Description" },
                    { "headerName": "Category", "field": "Category", "width": "200", "id": "Category" }]}
            />
        </Stack>
    )
}
