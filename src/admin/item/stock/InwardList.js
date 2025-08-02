import { Box, Button, Card, CardContent, IconButton, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useGridApiContext } from "@mui/x-data-grid-premium";
import { IconDetails, IconList } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
import { Link as Route } from "react-router-dom";
import ServerDataGrid from "../../../components/ServerDataGrid";
import InwardDetails from "./InwardDetails";

const InwardList = () => {
    const datatype = [null, null, 'number', null, 'dateTime']
    const filter = [false]
    const sortable = [false]
    const render = [
        ({ value }) => (
            <IconButton to={`/admin/stocks/inward/${value}`} component={Route}>
                <IconList />
            </IconButton>
        )
    ]

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
                <InwardDetails id={row.id} />
            </Box>
        )
    }, [])
    return (
        <Stack spacing={2}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h2" textAlign="center">Inwards</Typography>
                </CardContent>
            </Card>

            <ServerDataGrid
                getDetailPanelContent={({ row }) => <ListDetailComponent row={row} />}
                getDetailPanelHeight={() => 'auto'}
                sortable={sortable}
                filter={filter}
                render={render}
                datatype={datatype}
                ajax={{ url: '/api/stocks/inward' }}
                columns={[
                    { "headerName": "Action", "field": "Action", "width": "200", "id": "Action" },
                    { "headerName": "Description", "field": "Description", "width": "200", "id": "Description" },
                    { "headerName": "Quantity", "field": "Quantity", "width": "200", "id": "Quantity", "type": "number" },
                    { "headerName": "Owner", "field": "Owner", "width": "200", "id": "Owner" },
                    { "headerName": "Time", "field": "Time", "width": "200", "id": "Time", "type": "dateTime" }]}
            />
        </Stack>
    )
}
export default InwardList;